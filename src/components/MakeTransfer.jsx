import { useQuery, useQueryClient } from 'react-query';
import { executeTransaction } from '../services/UserService'
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function Abstract() {
    const queryClient = useQueryClient();
    const c = queryClient.getQueryData(["cards"]).data;
    const a = queryClient.getQueryData(["accounts"]).data;

    const cards = []
    Object.keys(c).map((item) => {
        cards.push({ value: c[item].id, label: c[item].code, data: "card", id: c[item].id, class: "", account_id: c[item].accountId})
    })

    const accounts = []
    Object.keys(a).forEach((item) => {
        accounts.push({ value: a[item].id, label: a[item].accountNumber, data: "account", id: a[item].id, class: ""})
    })
    
    const cards_and_accounts_sl1 = cards.concat(accounts)
    const cards_and_accounts_sl2 = cards.concat(accounts)
    const [filtered1, setFiltered1] = useState(cards_and_accounts_sl1)
    const [filtered2, setFiltered2] = useState(cards_and_accounts_sl2)

    const [selectedOption_s1, setSelectedOption_s1] = useState(null);
    const [selectedOption_s2, setSelectedOption_s2] = useState(null);

    const handleSetSelectedOption_s1 = (e) => {
        setSelectedOption_s1(e)
        setFiltered2(cards_and_accounts_sl2.filter(function(x) { 
            if (e !== null ) {
                if (x.label !== e.label) {
                    if (e.account_id !== x.id ){
                        return x
                    }
                }
            }
        }))
    }

    const handleSetSelectedOption_s2 = (e) => {
        setSelectedOption_s2(e)
        setFiltered1(cards_and_accounts_sl1.filter(function(x) { 
            if (e !== null) {
                if (x.label !== e.label) {
                    if (e.account_id !== x.id){
                        return x
                    }
                }
            }
        }))
    }

    const [amount, setAmount] = useState(0);

    const [comment, setComment] = useState("");

    const [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const d = selectedOption_s1.label;
        const c = selectedOption_s2.label;
        
        if (c.length === 16) {
            executeTransaction(d, c, amount, comment, "card", "LOCAL", "LOCAL").then(response => {return setResponse(response)});
        } else {
            executeTransaction(d, c, amount, comment, "account", "LOCAL", "LOCAL").then(response => {return setResponse(response)});
        }
    }

    return (
        <>
            <div className='container'>
                <form method="post" onSubmit={(e => {handleSubmit(e)})} className='card history-card'>
                    <label>
                        Откуда перевести деньги:
                        <Select
                            onChange={(e) => handleSetSelectedOption_s1(e)}
                            options={filtered1}
                            placeholder={"Выбирите вариант..."}z
                        />
                        Куда перевести деньги:
                        <Select
                            onChange={(e) => handleSetSelectedOption_s2(e)}
                            options={filtered2}
                            placeholder={"Выбирите вариант..."}
                        />
                        Сумма перевода:
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                        Комментарий:
                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                    </label>
                    <button type="submit">Перевести</button>
                </form>
            </div>
        </>
    )
}