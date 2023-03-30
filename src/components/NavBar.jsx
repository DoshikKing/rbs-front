import { NavLink } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

function NavBar() {
    const auth = useAuth();
    return (
        <>
            <div>
                <ul className='nav'>
                    <li>
                        <NavLink to="/home" >
                            Баланс
                        </NavLink >
                    </li>
                    <li>
                        <NavLink to="/services" >
                            Сервисы
                        </NavLink >
                    </li>
                    <li>
                        <NavLink to="/history" >
                            История
                        </NavLink >
                    </li>
                    <li className='footer'>
                        <a onClick={() => {void auth.signoutSilent().then(localStorage.removeItem('token'), window.location.replace('/')); auth.removeUser();} }>
                            Выйти
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavBar