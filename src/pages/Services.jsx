import { NavLink } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';


function Services() { 
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
                <div className='container'>
                    <div className='card service-card'>
                        <div className='card-item card-item-service'>
                            <NavLink to="/services" >
                                Перевести деньги
                            </NavLink>
                        </div>
                        <div className='card-item card-item-service'>
                            <NavLink to="/services" >
                                Оплатить сотовый
                            </NavLink>
                        </div>
                        <div className='card-item card-item-service'>
                            <NavLink to="/services" >
                                Placeholder
                            </NavLink>
                        </div>
                        <div className='card-item card-item-service'>
                            <NavLink to="/services" >
                                Placeholder
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Services;