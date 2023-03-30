import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from "react-oidc-context";
import oidcConfig from './configs/Config';
import { BrowserRouter } from 'react-router-dom';
import RouteConfig from './routes/RouteConfig';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const onSigninCallback = _user => {
  window.history.replaceState({}, document.title, window.location.pathname);
  //window.location.replace('/home');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider onSigninCallback={onSigninCallback} {...oidcConfig} > 
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouteConfig />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)