import { useAuth } from 'react-oidc-context';
import Abstract from '../components/Abstract';

function History() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return ( 
            <>
                <div>
                    <Abstract />
                </div>
            </>
        )
    }
}

export default History;