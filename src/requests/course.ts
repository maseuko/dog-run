import { POST_REQUEST } from "../utils/requests"
import { SERVER_URI } from "../constants/url";
import { CourseInfo, RegularDataResponse, SingleResource } from "../interfaces/server_responses";

export const addNewCourse = async (course: {name: string, price: number, icon: File}, resources: {description: string, video: File, task: string}[] ) => {
    const courseFD = new FormData();
    courseFD.append("name", course.name);
    courseFD.append("price", course.price.toString());
    courseFD.append("icon", course.icon);
    const newCourseResponse: RegularDataResponse = await POST_REQUEST(SERVER_URI+"/adm/add-course", courseFD);
    if(newCourseResponse.statusCode !== "CREATED") return;
    const createdCourse: CourseInfo = newCourseResponse.data;
    for(const resource of resources){
        const resourceFD = new FormData();
        resourceFD.append("description", resource.description);
        resourceFD.append("video", resource.video);
        const newResourceResponse: RegularDataResponse = await POST_REQUEST(SERVER_URI+"/adm/add-course-resource?cid="+createdCourse.id, resourceFD);
        if(newResourceResponse.statusCode !== "CREATED") continue;
        const createdResource: SingleResource = newResourceResponse.data;
        const newTask = await POST_REQUEST(SERVER_URI+"/adm/add-task?cid="+createdCourse.id+"&rsid="+createdResource.id, {description: resource.task}, true);
        
    }
}