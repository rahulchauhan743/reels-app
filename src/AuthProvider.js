import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) =>{

    let [user, setUser] = useState(null);

    let [loading, setLoading] = useState(true);

     //it is case 1 of useEffect which only executes on first render
     useEffect(() => {
        
         //onAuthStateChanged is eventlistener which exectues the given function when authorisation of user changes
         //when user login it prints user details like email,profile pic(when we login we receive a object which have user data)
         //when user logout so there is no user so it prints null

        auth.onAuthStateChanged( async (user) => {
          
        if(user){
            let {displayName, email, uid, photoURL } = user;

            //this give us reference to that particular id(this id is unique for every google account signup) in users collection
            let docRef = firestore.collection("users").doc(uid);

            // .get() is promise based function so using await
            //.get() data at that time
            let documentSnapshot = await docRef.get(); 
             
            //if that data doesnot exist so we set the data object
            if(!documentSnapshot.exists){

                docRef.set({
                    displayName,
                    email,
                    photoURL
                })
            }

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