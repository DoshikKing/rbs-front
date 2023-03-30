import { useQuery } from 'react-query';
import {getListOfCards, getListOfAccounts} from '../services/UserService'

export default function Balance() {
    const { isLoading, isError, data, error, isSuccess, isFetching, isFetched } = useQuery({
        queryKey: ['cards'],
        queryFn: async() => {
            const cards = getListOfCards();
            return cards;
        },
    }, {
    refetchOnWindowFocus: false,
    })

    if(isFetching) {
        return (<div>Обновляем...</div>)
    }   

    if (isLoading) {
        return (<div>Загрузка...</div>)
    }

    if (isError) {
        return(<div>Упс! {error.message}</div>)
    }

    const cards = Object.keys(data.data).map((item, i) => {
        if (isFetched) {
            return(
                <div className='card-item' key={i}>
                    <h4>{data.data[item].code} {data.data[item].paySystem}</h4>
                    <h5>Остаток: {data.data[item].summ} ₽</h5>
                    <h6> Срок: {data.data[item].statusTime}</h6>
                </div>
            )
        }
    })

    if (isSuccess) {
        return (
            <>
                <div className='container'>
                    <div className='card'>
                        {cards}
                    </div>
                </div>
            </>
        )
    }
}