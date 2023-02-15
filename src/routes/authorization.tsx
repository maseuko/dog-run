import Authorization from "../pages/Authorization";
import SignIn from "../components/Authorization/SignIn";
import SignUp from "../components/Authorization/SignUp";
import RetrievePassword from "../components/Authorization/RetrievePassword";
import Comunicate from "../components/Authorization/Comunicate";
import RenewPassword from "../components/Authorization/RenewPassword";

const authorizationRoutes = {
    path: "/auth",
    element: <Authorization/>,
    children: [
        {
            path: "",
            element: <SignIn/>
        },
        {
            path: "sign-up",
            element: <SignUp/>
        },
        {
            path: "retrieve-password",
            element: <RetrievePassword/>
        },
        {
            path: "registered-succesfully",
            element: <Comunicate/>
        },
        {
            path: "renew-password",
            element: <RenewPassword/>
        }
    ]
}

export default authorizationRoutes;