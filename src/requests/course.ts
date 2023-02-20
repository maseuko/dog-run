import { POST_REQUEST } from "../utils/requests"
import { SERVER_URI } from "../constants/url";
import { CourseInfo, RegularDataResponse, SingleResource } from "../interfaces/server_responses";
import ResourceInterface from "../interfaces/resource";

const addNewResource = async (resource: ResourceInterface, courseId: string): Promise<boolean> => {
    const resourceFD = new FormData();
    resourceFD.append("description", resource.description);
    resourceFD.append("cid", courseId);
    resource.file && resourceFD.append("video", resource.file);
    const newResourceResponse: RegularDataResponse = await POST_REQUEST(SERVER_URI+"/adm/add-course-resource", resourceFD);
    if(newResourceResponse.statusCode !== "CREATED") return false;
    const createdResource: SingleResource = newResourceResponse.data;
    const newTask: RegularDataResponse = await POST_REQUEST(
            SERVER_URI+"/adm/add-task", 
            {cid: courseId,rsid: createdResource.id ,description: resource.task}, 
            true
        );
    return newTask.statusCode === "CREATED";
}

export const addNewCourse = async (course: {name: string, price: number, icon: File}, resources: ResourceInterface[], loadingHandler: Function) => {
    const courseFD = new FormData();
    courseFD.append("name", course.name);
    courseFD.append("price", course.price.toString());
    courseFD.append("icon", course.icon);
    const newCourseResponse: RegularDataResponse = await POST_REQUEST(SERVER_URI+"/adm/add-course", courseFD);
    console.log(newCourseResponse);
    if(newCourseResponse.statusCode !== "CREATED") return;
    const createdCourse: CourseInfo = newCourseResponse.data;
    for(const resource of resources){
        await addNewResource(resource, createdCourse.id);
        loadingHandler();
    }
}
