import ControlPanel from "../pages/ControlPanel"
import AddNewCourse from "../components/ControlPanel/AddNewCourse/AddNewCourse";
import Quibble from "../components/ControlPanel/Quibble/Quibble";

const ControlPanelRoutes = {
    path: "/control-panel",
    element: <ControlPanel/>,
    children: [
        {
            path: "",
            element: <AddNewCourse/>
        },
        {
            path: "new-course",
            element: <AddNewCourse/>
        },
        {
            path: "quibble-manager",
            element: <Quibble/>
        }
    ]
}

export default ControlPanelRoutes;