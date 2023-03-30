import { useAuth } from "react-oidc-context";

function Welcome() { 
    const auth = useAuth();
    
    return (
        <>
            <div className="welcome">
                <h2 >Добро пожаловать в онлайн банк!</h2>
                <button onClick={() => {void auth.signinRedirect();}}>Войти</button>
            </div>
        </>
    )
}

export default Welcome;