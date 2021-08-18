import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { auth } from "../firebase";
import VideoCard from "./VideoCard";


import "./home.css";

let Home = () => {
  
  let user = useContext(authContext);
  
  return(
     <>
     
     {user ? "" : <Redirect to = "/login" />}

     <div className = "video-container">
           <VideoCard/>
           <VideoCard/>
           <VideoCard/><VideoCard/>
           <VideoCard/>
           <VideoCard/><VideoCard/>
     </div>
     
     <button 
            className = "home-logout-btn"
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