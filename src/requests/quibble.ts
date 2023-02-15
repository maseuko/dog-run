import { SERVER_URI } from "../constants/url";
import { QuibbleResponse, RegularResponse } from "../interfaces/server_responses";

import { GET_REQUEST, DELETE_REQUEST } from "../utils/requests";

export const deleteImage = async (id: string): Promise<boolean> => {
    const response: RegularResponse = await DELETE_REQUEST(SERVER_URI+"/quibbles/delete-image?id="+id);
    return response.statusCode === "OK";
}

export const deleteQuibble = async (name: string) => {
    const response: RegularResponse = await DELETE_REQUEST(SERVER_URI+"/quibbles/delete-quibble?name="+name);
    return response.statusCode === "OK";
}

export const fetchQuibbles = async (): Promise<QuibbleResponse> => {
    const response: QuibbleResponse = await GET_REQUEST(SERVER_URI+"/quibbles");
    return response;
}