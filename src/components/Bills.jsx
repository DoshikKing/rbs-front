import { getListOfBillings } from '../services/UserService'
import { useState } from 'react';

export default function Bills() { 
    
    const [billings, setBillings] = useState(null);
    
    getListOfBillings().then(c => {
        const billings = Object.keys(c.data).map((item, i) => {
            return (
                <p key={i}>{c.data[item].billingName + " Комментарий: " + c.data[item].comment + " Статус: " + c.data[item].status}</p>
            )
        })
        setBillings(billings)
    })

    return (
        <div className='container'>
            <div className='card service-card'>
                {billings}
            </div>
        </div>
    )
}