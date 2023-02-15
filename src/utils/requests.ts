export const POST_REQUEST = async (url: string, data: any, isJson: boolean = false) => {
    const requestConfig: any = {};
    requestConfig.method = "POST";
    if(isJson){
        requestConfig.body = JSON.stringify(data);
        requestConfig.headers = {
            "Content-Type": "application/json"
        };
    }else{
        requestConfig.body = data;
    }
    const request = await fetch(url, requestConfig);
    const response = await request.json();

    return response;
}

export const GET_REQUEST = async (url: string) => {
    const request = await fetch(url);
    const response = await request.json();
    return response;
}

export const DELETE_REQUEST = async (url: string) => {
    const request = await fetch(url, {
        method: "delete"
    });
    const response = await request.json();
    return response;
}