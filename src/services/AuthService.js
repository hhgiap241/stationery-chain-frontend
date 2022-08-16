import Keycloak from 'keycloak-js';

// const initOptions = {
//     url: "http://localhost:8180/auth/",
//     realm: "stationery-realm",
//     clientId: "react-client",
//     onLoad: "login-required",
// }
const keycloak = new Keycloak('/keycloak.json');

const initKeycloak = (callback) => {
    keycloak.init({
        onLoad: 'login-required',
    })
        .then((authenticated) => {
            localStorage.setItem('access-token', keycloak.token);
            localStorage.setItem('refresh-token', keycloak.refreshToken);
            console.log(keycloak.token);
            console.log(keycloak);
            callback();
        }).catch(err => {
        console.log(err);
        console.log('failed to authenticated');
    })
};
const doLogin = keycloak.login;
const doLogout = keycloak.logout;
const getToken = () => keycloak.token;
const isAuthenticated = () => keycloak.authenticated;
const updateToken = (successCallback) => {
    return keycloak.updateToken(5)
        .then(successCallback)
        .catch(doLogin);
};
const getUsername = () => keycloak.tokenParsed.preferred_username;
const getRoles = () => keycloak.tokenParsed.realm_access.roles;

const AuthService = {
    initKeycloak,
    doLogin,
    doLogout,
    isAuthenticated,
    getToken,
    updateToken,
    getUsername,
    getRoles
}
export default AuthService;