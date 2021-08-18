import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { auth } from "../firebase";



let Home = () => {
  
  let user = useContext(authContext);
  
  return(
     <>
     
     {user ? "" : <Redirect to = "/login" />}

     <h1>Home</h1> 
     <button 
            onClick = {
              //auth.signOut() is used to signout from any platform
                () => {
                    auth.signOut();
                }
            }>
              logout
         </button>
  

     </> 
  )
  
};
  
  export default Home;