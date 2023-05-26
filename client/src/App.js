import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import { authActions } from "./store/authSlice";

import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      dispatch(authActions.login(JSON.parse(localStorage.getItem("userData"))));
    }
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact>
          {isLoggedIn ? <Chat /> : <Auth />}
        </Route>
        <Route path='/lobby'>
          {isLoggedIn ? <Chat /> : <Redirect to='/' />}
        </Route>
        <Route path='*'>
          <PageNotFound isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
