import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) =>{

    let [user, setUser] = useState(null);

    let [loading, setLoading] = useState(true);

     //it is case 1 of useEffect which only executes on first render
     useEffect(() => {
        
         //onAuthStateChanged is eventlistener which exectues the given function when authorisation of user changes
         //when user login it prints user details like email,profile pic(when we login we receive a object which have user data)
         //when user logout so there is no user so it prints null

        auth.onAuthStateChanged((user) => {
          
        if(user){
            let {displayName, email, uid, photoURL } = user;

            setUser({displayName, email, uid, photoURL});
        }
        else{
            setUser(null);
        }
          
        setLoading(false);
         
       });
       
      
    
   } ,[])


   return(
       <authContext.Provider value = {user}>
           {!loading && props.children}  
       </authContext.Provider>
   )

}

export default AuthProvider;