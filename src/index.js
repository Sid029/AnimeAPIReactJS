import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './Components/Globalstyle';
import { GlobalContextProvider } from './Context/global';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-75yft0thgld5ut6o.eu.auth0.com"
    clientId="Py4MbrtuhHmIE4h9crUxs6Sw7x1VE3Si"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <GlobalStyle />
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    </Auth0Provider>,
  </React.StrictMode>
);
