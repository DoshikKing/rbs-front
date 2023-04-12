import { Navigate, Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import { useAuth } from "react-oidc-context";
import Home from "../pages/Home";
import Services from "../pages/Services";
import NavBar from "../components/NavBar";
import History from "../pages/History";
import Transfer from "../pages/Transfer"

function RouteConfig() { 
    const auth = useAuth();

    if(!auth.isAuthenticated) {
        return (
            <Welcome />
        )
    }

    return (
        <>
            <NavBar />
            <Routes>
                {/* <Route exact path="/" element={<Welcome />} /> */}
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/history" element={<History />} />
                <Route exact path="/transfer" element={<Transfer />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>Упс! такой страницы не существует...</p>
                        </main>
                    }
                />
            </Routes>
        </>
    )
}

export default RouteConfig;