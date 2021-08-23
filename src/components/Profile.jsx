import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider"
import { firestore } from "../firebase";

import "./profile.css";

let Profile = () => {

    let user = useContext(authContext);

    let [totalPosts, setTotalPosts] = useState(0);
   
     useEffect(() => {

        let f = async () =>{
           let querySnapshot = await firestore.collection("posts").where("name","==",user.displayName).get();
               
           setTotalPosts(querySnapshot.size);                   
        };
           
           f();

     }, []);

      

    return(
        <>
           <h1 className = "asd">PROFILE PAGE</h1>

           {user ? (
           <div>
            <img className="img-profile" src = {user.photoURL} alt="" />
            <p className="username-profile">{user.displayName}</p>
            <p className="ttpost">Total Posts: {totalPosts}</p>
            </div>
       ) :(<Redirect to="/Login" />)
       }

       </>  

    )



}

export default Profile;