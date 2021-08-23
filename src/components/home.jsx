import { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { auth, storage ,firestore} from "../firebase";
import VideoCard from "./VideoCard";



import "./home.css";

let Home = () => {
  
  let user = useContext(authContext);
  let [posts,setPosts] = useState([]);

  useEffect(() => {
   
    // onSnapshot is EventListener which is used when there is change in posts collection data so it execute the given function
    firestore.collection("posts").onSnapshot((querySnapshot) =>{
      // querySnapshot is the snapshot of all document in posts

      //it bring all object in posts collection 
      let docArr = querySnapshot.docs; //it is the data present in posts collection

       let arr = [];
      // here we take put post data from database and store it in array to pass it to VideoCard
       for (let i = 0; i < docArr.length; i++) {
        
         arr.push({
           id: docArr[i].id,
           ...docArr[i].data()//give data of single document
         })
        
       }
         
       setPosts(arr);
    })


  },[])
 

  
  return(
     <>
      {/* agar user nhi he tho mujhe login par Redirect kardo */}
      {/* if user is null and does not have user object so Redirect to login */}

      { user ? "" : <Redirect to = "/login" /> }

     <div className = "video-container">
             
             {/* videoCard ko data pass kardiya jisme uploaded video ki details he */}
             {posts.map((el)=>{
                 return <VideoCard key = {el.id} data = {el} />
             })

             } 
          
     </div>
     
     <button 
            className = "home-logout-btn"
            onClick = {
              //auth.signOut() is used to signout from any platform
                () => {
                    auth.signOut();
                }
            }>
              <span class="material-icons ds">
                logout
             </span>
         </button>


         <Link to = "/Profile">
            <button id="profile"><span class="material-icons sd"> 
                                      account_circle
                                 </span> 
            </button>
         </Link>

        
         <input
            className = "dfg"
            type="file"//for inputting a file

             //e.currentTarget.value = null-> THIS IS DONE NULL BECAUSE IF USER UPLOAD SAME NAME VIDEO AGAIN SO HE CAN UPLOAD THE  SAME VIDEO AGAIN
             //AS INPUT COMPARES NEW FILE NAME WITH PREVIOUS ONE
            onClick = {
              (e) => {
                e.currentTarget.value = null;
              }
            }  

            onChange = {

              (e) => {
                 let videoObj = e.currentTarget.files[0];//e.currentTarget.files gives file object and zero element of that object gives that files we uploaded

                 let {name , size, type} = videoObj;//that file has many property as name,size,type in object form so we stored particular property of that video in videoObj object

                 size = size / 1000000;

                if (size > 10) {
                  alert("file size exceeds 10mb");//as we dont want a video greater than 10 mb to be uploaded
                  return;
                }

                type = type.split("/")[0];

                if (type !== "video") {
                  alert("Please upload a video file");//as we dont want a file other than "video" type to be uploaded
                  return;
                } 
                
                //SO HERE WE BRING REFERENCE OF THE LOCATION WHERE WE WANT TO STORE THE VIDEO AND PUT THE THE VIDEO THERE
                //WE USE USER.UID TO IDENTIFY WHICH USER UPLOADED WHICH VIDEO
                //WE USE .PUT() METHOD TO UPLOAD VIDEO IN STORAGE
                let uploadTask = storage.ref(`/posts/${user.uid}/${Date.now() + "-" + name}`).put(videoObj);

                // .on() is a eventlistener where "state_changed" is event 
                // where when the event is changed so these function exectues
                // first function tell progress of event
                // second function tell error if event fails
                // third function is exectues after event is done  

                uploadTask.on("state_changed", ()=>{}, ()=>{}, () => { 
                   
                  // getDownloadURL() gives url of that uploaded video 
                  // it is a promise based so use .then() when promise is resolved so we do something with that url
                  
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                       console.log(url);
                       
                       //user ki uploaded video li details ko database me dal diya gya 
                       firestore.collection("posts").add({
                         name: user.displayName,
                         url,
                         likes: [],
                         comments: [],
                       })

                    })
                }) 

              }
            }
          
         />
  

     </> 
  )
  
};
  
  export default Home;