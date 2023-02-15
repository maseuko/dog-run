import RegistrationInterface from "../interfaces/registration-data-form";
import { SERVER_URI } from "../constants/url";
import { GET_REQUEST, POST_REQUEST } from "../utils/requests";
import { SignInInterface } from "../interfaces/sign-data-form";

export const register = async (data: RegistrationInterface) => {
    return await POST_REQUEST(SERVER_URI+"/auth/register", data, true);
}

export const signIn = async (data: SignInInterface): Promise<boolean> => {
    const result = await POST_REQUEST(SERVER_URI+"/auth/sign-in", data, true);
    if(result.statusCode === "OK"){
        const dateAuthCookie = new Date();
        dateAuthCookie.setTime(dateAuthCookie.getTime()+(60*60*1000));

        const dateRefreshCookie = new Date();
        dateRefreshCookie.setTime(dateRefreshCookie.getTime()+(30*24*60*60*1000))
        
        document.cookie = `DAUTH_TKN_=${result.data.authToken}; expires=${dateAuthCookie.toUTCString()}; path=/; SameSite=Lax;`;
        document.cookie = `DAUTH_RFRSH_TKN_=${result.data.refreshToken}; expires=${dateRefreshCookie.toUTCString()}; path=/; SameSite=Lax;`;

        return true;
    }
    return false;
}

export const retrievePassword = async (data: SignInInterface): Promise<boolean> => {
    const response = await POST_REQUEST(SERVER_URI+"/auth/password-retriever", data, true);
    if(response.statusCode === "OK") return true;
    return false;
}

export const checkForKeyValidity = async (data: {key: string, u: string}): Promise<boolean>=>{
    const response = await GET_REQUEST(SERVER_URI+"/auth/check-retrieve-token?key="+data.key+"&u="+data.u);
    if(response.statusCode === "OK") return true;
    return false;
}

export const savePasswordRequest = async (data: {key: string, user: string, password: string}):Promise<boolean> => {
    console.log(SERVER_URI+"/auth/change-password?key="+data.key+"&u="+data.user);
    console.log(data);
    const response = await POST_REQUEST(SERVER_URI+"/auth/change-password?key="+data.key+"&u="+data.user, {password: data.password}, true);
    if(response.statusCode === "ACCEPTED") return true;
    return false;
}