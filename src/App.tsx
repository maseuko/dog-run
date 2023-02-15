import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import routes from "./routes";
import queryClient from "./constants/query-client";
import { useEffect } from "react";
import { getAuthorizationCookies } from "./utils/authorization";
import { useDispatch } from "react-redux";
import { setTokens, setLoggedState } from "./redux/authentication";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuthorizationCookies();
    if(!auth.authToken && !auth.refreshToken) return;
    dispatch(setTokens(auth));
    dispatch(setLoggedState(true));
  },[dispatch]);



  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
