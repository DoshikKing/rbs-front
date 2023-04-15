import { useAuth } from 'react-oidc-context';
import Bills from '../components/Bills';

function Billing() {
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
                    <Bills />
                </div>
            </>
        )
    }
}

export default Billing;