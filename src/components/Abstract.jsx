import { useQuery, useQueryClient } from 'react-query';
import {getAccountAbstract, getCardAbstract} from '../services/UserService'
import { useState } from 'react';
import Select from 'react-select';

export default function Abstract() {
    const queryClient = useQueryClient();
    const c = queryClient.getQueryData(["cards"]).data;
    const a = queryClient.getQueryData(["accounts"]).data;

    const cards = []
    Object.keys(c).map((item) => {
        cards.push({ value: c[item].id, label: c[item].code, data: "card"})
    })

    const accounts = []
    Object.keys(a).forEach((item) => {
        accounts.push({ value: a[item].id, label: a[item].accountNumber, data: "account"})
    })

    const [trans, setTrans] = useState();

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        var id = selectedOption.value
        var selected_type = selectedOption.data

        if(selected_type == "card") {
            getCardAbstract(id).then(c => {
                const transactions = Object.keys(c.data).map((item, i) => {
                    return (
                        <p key={i}>{c.data[item].transactionTime + " Сумма: " + (c.data[item].isDebit ? "-" : "+") + " " + c.data[item].amount + " Комментарий: " + c.data[item].comment}</p>
                    )
                })
                setTrans(transactions)
            });
        } 
        if (selected_type == "account") {
            getAccountAbstract(id).then(c => {
                const transactions = Object.keys(c.data).map((item, i) => {
                    return (
                        <p key={i}>{c.data[item].transactionTime + " Сумма: " + (c.data[item].isDebit ? "-" : "+") + " " + c.data[item].amount + " Комментарий: " + c.data[item].comment}</p>
                    )
                })
                setTrans(transactions)
            });
        }
    }

    const handleSetSelectedOption = (e) => {
        setSelectedOption(e)
    }

    return (
        <>
            <div className='container'>
                <form method="post" onSubmit={(e => {handleSubmit(e)})} className='card history-card'>
                    <label>
                        <Select 
                            onChange={(e) => handleSetSelectedOption(e)}
                            options={cards.concat(accounts)}
                            placeholder={"Выбирите вариант..."}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {trans}
            </div>
        </>
    )
}