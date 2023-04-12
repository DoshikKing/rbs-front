import { useQuery, useQueryClient } from 'react-query';
import { executeTransaction } from '../services/UserService'
import { useState } from 'react';

export default function Abstract() {
    const queryClient = useQueryClient();
    const c = queryClient.getQueryData(["cards"]).data;
    const a = queryClient.getQueryData(["accounts"]).data;
    const cards = Object.keys(c).map((item, i) => {
        return (
            <option key={i} value={c[item].code}>{c[item].code}</option>
        )
    })
    const accounts = Object.keys(a).map((item, i) => {
        return (
            <option key={i} value={a[item].accountNumber}>{a[item].accountNumber}</option>
        )
    })

    const [amount, setAmount] = useState(0);

    const [comment, setComment] = useState("");

    const [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const code = Object.fromEntries(formData.entries())
        const d = code.debit;
        const c = code.credit;
        
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
                        <select name="debit">
                            {accounts}
                        </select>
                        Куда перевести деньги:
                        <select name="credit">
                            {cards}
                            {accounts}
                        </select>
                        Сумма перевода:
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                        Комментарий:
                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                    </label>
                    <button type="submit">Перевести</button>
                </form>
                {(response == "Done.")?("Перевод прошел успешно"):(response.toString)}
            </div>
        </>
    )
}