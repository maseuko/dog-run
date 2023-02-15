import { createBrowserRouter } from "react-router-dom";
import homePageRoutes from "./home-page";
import controlPanelRoutes from "./control-panel";
import authorizationRoutes from "./authorization";

export default createBrowserRouter([homePageRoutes, controlPanelRoutes, authorizationRoutes]);