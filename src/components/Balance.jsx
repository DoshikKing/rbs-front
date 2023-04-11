import { useQuery } from 'react-query';
import {getListOfCards, getListOfAccounts} from '../services/UserService'

export default function Balance() {
    const { 
        isLoading: cards_isLoading, 
        isError: cards_isError, 
        data: cards_data, 
        error: cards_error, 
        isSuccess: cards_isSuccess, 
        isFetching: cards_isFetching, 
        isFetched: cards_isFetched 
    } = useQuery({
        queryKey: ['cards'],
        queryFn: async() => {
            const cards = getListOfCards();
            return cards;
        },
    }, {
        refetchOnWindowFocus: false,
    })

    const { 
        isLoading: accounts_isLoading, 
        isError: accounts_isError, 
        data: accounts_data, 
        error: accounts_error, 
        isSuccess: accounts_isSuccess, 
        isFetching: accounts_isFetching, 
        isFetched: accounts_isFetched 
    } = useQuery({
        queryKey: ['accounts'],
        queryFn: async() => {
            const accounts = getListOfAccounts();
            return accounts;
        },
    }, {
        refetchOnWindowFocus: false,
    })

    if(cards_isFetching) {
        return (<div>Обновляем...</div>)
    }   

    if (cards_isLoading) {
        return (<div>Загрузка...</div>)
    }

    if (cards_isError) {
        return(<div>Упс! {cards_error.message}</div>)
    }

    const cards = Object.keys(cards_data.data).map((item, i) => {
        if (cards_isFetched) {
            return(
                <div className='card-item' key={i} data={cards_data.data[item].accountId}>
                    <h4>{cards_data.data[item].code} {cards_data.data[item].paySystem}</h4>
                    <h5>Остаток: {cards_data.data[item].balance} ₽</h5>
                    <h6> Статус: {cards_data.data[item].status}</h6>
                </div>
            )
        }
    })

    const accounts = Object.keys(accounts_data.data).map((item, i) => {
        
        if (accounts_isFetched) {
            return(
                <div className='card-item' key={i}>
                    <h4>{accounts_data.data[item].accountNumber}</h4>
                    <h5>Остаток: {accounts_data.data[item].balance} ₽</h5>
                    <h6> Статус: {accounts_data.data[item].status}</h6>
                    {cards.find(card => card.props.data == 1)}
                </div>
            )
        }
    })

    if (cards_isSuccess) {
        return (
            <>
                <div className='container'>
                    <div className='card'>
                        {accounts}
                    </div>
                </div>
            </>
        )
    }
}