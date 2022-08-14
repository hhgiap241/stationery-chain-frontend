import Keycloak from 'keycloak-js'

const initOptions = {
    url: "http://localhost:8180/auth/",
    realm: "stationery-realm",
    clientId: "react-client",
    onLoad: "login-required",
}
const keycloak = new Keycloak(initOptions);
keycloak.init({onLoad: initOptions.onLoad})
    .then((authenticated) => {
        alert(authenticated ? 'authenticated' : 'not authenticated');
        localStorage.setItem('accessToken', keycloak.token);
        localStorage.setItem('refreshToken', keycloak.refreshToken);
        console.log(keycloak.token);
        console.log(keycloak);
        console.log('from nav', keycloak.tokenParsed.preferred_username)
    }).catch(err => {
    console.log(err);
    alert('failed to authenticated');
})
export default keycloak