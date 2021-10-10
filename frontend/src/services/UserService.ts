import Keycloak from "keycloak-js";

const _kc = Keycloak('./keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: () => void) => {
    _kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then(() => {
            onAuthenticatedCallback();
        })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const hasRole = (roles: any[]) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {

    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    hasRole,
};

export default UserService;
