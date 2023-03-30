import { useAuth } from 'react-oidc-context';
import Balance from '../components/Balance';

function Home() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        localStorage.setItem('token', auth.user?.access_token);
        return ( 
            <>
                <div>
                    <Balance />
                </div>
            </>
        )
    }
}

export default Home;