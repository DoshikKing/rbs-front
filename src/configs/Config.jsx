const oidcConfig = {
    authority: "http://localhost:9000/realms/RBS_Telegram",
    client_authentication: "client_secret_post",
    client_id: "rbs-react",
    client_secret: 'YSkddjy6Di3ryFQXm0UfNuo96XwwfrKE',
    redirect_uri: "http://localhost:5173/home",
    post_logout_redirect_uri: "http://localhost:5173/welcome",
    scopes: "openid"
  };

export default oidcConfig;