import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";

import AuthProvider from "./AuthProvider";

let App= () => {
  return (
    <>
      
      <AuthProvider>
      
        <Router>
          
          <Switch>
          
          <Route exact path="/Login">
             <Login />
          </Route> 

          <Route exact path="/">
             <Home />
          </Route>
 
          </Switch>
        

        </Router>

      </AuthProvider>
      
    </>
  );
}

export default App;