import { useContext} from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import {signInWithGoogle} from "../firebase"

let Login = () => {

  let user = useContext(authContext);
      
   return(
     <>
       {/* when login with google button is clicked  signInWithGoogle() function is called which opens a popup for google signup */}
       
         {user ? <Redirect to ="/" /> : ""}

         <button  className="btn btn-primary m-4" 
           onClick={
             () => {
                 signInWithGoogle();
             }
           }
         >

        Login with google
         </button>

     </>


   )

}

export default Login;