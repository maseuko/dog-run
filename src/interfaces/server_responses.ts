export interface QuibbleResponse{
    msg: string,
    data: {
        name: string,
        images: {
            id: string,
            url: string
        }[]
    }[],
    statusCode: string
}

export interface RegularResponse{
    msg: string,
    statusCode: string
}

export interface RegularDataResponse{
    msg: string,
    data: any,
    statusCode: string
}

export interface CourseInfo {
    id: string,
    name: string,
    price: number,
    icon_url: string
}

export interface SingleResource{
    id: string,
    url: string,
    description: string
}