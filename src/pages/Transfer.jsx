import { useAuth } from 'react-oidc-context';
import MakeTransfer from '../components/MakeTransfer';

function Home() {
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
                    <MakeTransfer />
                </div>
            </>
        )
    }
}

export default Home;