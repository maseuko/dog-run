export const getAuthorizationCookies = (): {authToken: string, refreshToken: string} => {
    const authObj = {authToken: "", refreshToken: ""};
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    cArr.forEach(val => {
        if (val.indexOf("DAUTH_TKN_=") === 0) authObj.authToken = val.substring(11);
        if (val.indexOf("DAUTH_RFRSH_TKN_=") === 0) authObj.refreshToken = val.substring(17);
    });
    return authObj;
}