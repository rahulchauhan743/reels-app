import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext = createContext();

//when the user has logined so onAuthStateChanged eventlistener get called and function inside it get called
//using setUser of useState we update user state by assigning it with users details
//after this loading is set to false
//as state is changed so rerender occurs
//authContext.Provider will come in action and pass user state to its child componenet
//and as user has logined so loading is also false and authprovider has childern so it show its children
//we have created a context for user as it is used in child componenet home and login


let AuthProvider = (props) =>{

    let [user, setUser] = useState(null);

    //user login kar rha he tho loading true
    //user login hone ke badh loading false ya logout ke badh
    let [loading, setLoading] = useState(true);

     //it is case 1 of useEffect which only executes on first render
     useEffect(() => {
        
         //onAuthStateChanged is eventlistener which exectues the given function when authorisation of user changes
         //when user login it prints user details like email,profile pic(when we login we receive a object which have user data)
         //when user logout so there is no user so it prints null

        auth.onAuthStateChanged( async (user) => {
          
            //if i have a user
        if(user){//login hoga tho ye chalegha 
            let {displayName, email, uid, photoURL } = user;

            //this give us reference to that particular id(this id is unique for every google account signup) in users collection
          
            // we get a document object with uid in "users" collection
            let docRef = firestore.collection("users").doc(uid);

            // .get() is promise based function so using await
            //.get() data at that time
             
            //here we get a encapsulated object using .get()
            let documentSnapshot = await docRef.get();
             
            //if that data doesnot exist so we set the data object
            
            //if there was no such document object with uid so firebase creates a fake one
            //.exisits help us to know that the object is fake or not
            if(!documentSnapshot.exists){
                //if fake we override fake values with real ones using .set()
                docRef.set({
                    displayName,
                    email,
                    photoURL
                });
            } 


            setUser({displayName, email, uid, photoURL});
        }
        else{//logout hoga tho ye chalega
            setUser(null);
        }
          
        setLoading(false);
         
       });
       
      
    
   } ,[])


   return(

      // !loading ka matlab ya user ne login karchuka he ya logout kar chuka he tho uske childern dikha do 
      // children "home" aur "login" hote he

       <authContext.Provider value = {user}>
       {/* jab loading false he tho AuthProvider ke childern dikha do agar uske chidren he tho*/}
           
           
           {!loading && props.children}  

       </authContext.Provider>
   )

}

export default AuthProvider;