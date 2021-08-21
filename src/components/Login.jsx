import { useContext} from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import {signInWithGoogle} from "../firebase"

//after we click on google button the signInWithGoogle() gets called 
//the signInWithGoogle() function opens google in pop up for login option

let Login = () => {

  let user = useContext(authContext);
      
   return(
     <>
       {/* when login with google button is clicked  signInWithGoogle() function is called which opens a popup for google signup */}
        
        {/* agar user he tho mujhe home par Redirect kardo */}
        {/* if user is not null or it has a user object so Redirect to home  */}
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