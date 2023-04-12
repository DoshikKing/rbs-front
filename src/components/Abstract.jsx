import { useQuery, useQueryClient } from 'react-query';
import {getAccountAbstract, getCardAbstract} from '../services/UserService'
import { useState } from 'react';

export default function Abstract() {
    const queryClient = useQueryClient();
    const c = queryClient.getQueryData(["cards"]).data;
    const a = queryClient.getQueryData(["accounts"]).data;
    const cards = Object.keys(c).map((item, i) => {
        return (
            <option key={i} data={"card"} value={c[item].id}>{c[item].code}</option>
        )
    })
    const accounts = Object.keys(a).map((item, i) => {
        return (
            <option key={i} data={"account"} value={a[item].id}>{a[item].accountNumber}</option>
        )
    })

    const [trans, setTrans] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const id = data.selected
        var selected_type = ""
        for (const i of document.getElementById("abstract").children) {
            if(i.selected){
                selected_type ="" + i.attributes["data"].value
                break;
            }
        }
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

    return (
        <>
            <div className='container'>
                <form method="post" onSubmit={(e => {handleSubmit(e)})} className='card history-card'>
                    <label>
                        <select id="abstract" name="selected">
                            {cards}
                            {accounts}
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {trans}
            </div>
        </>
    )
}