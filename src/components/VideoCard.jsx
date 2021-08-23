// eslint-disable-next-line
import { useContext, useEffect, useState } from "react";
import "./videoCard.css";
import { authContext } from "../AuthProvider"
import { firestore } from "../firebase";

let VideoCard = (props) => {

    let user = useContext(authContext);

    let [playing , setPlaying] = useState(false);

     let [currUserComment, setcurrUserComment] = useState("");

     let [commentBoxOpen, setcommentBoxOpen] = useState(false);

     let [Allcomments, setAllComments] = useState([]);

     let currUserLiked;

     if(user){
         currUserLiked = props.data.likes.includes(user.uid);
     }

     useEffect(() => {
           let f = async () =>{
               
            let commentsArr = props.data.comments;

            let arr = [];
            
            for (let i = 0; i < commentsArr.length; i++) {

                let commentDoc = await firestore.collection("comments").doc(commentsArr[i]).get();
                
                arr.push(commentDoc.data());
            }

            setAllComments(arr);

           }      


        f();
     },[props])
     
    return(
        <div className ="video-card">
         
           <p className ="video-card-username">{props.data.name}</p>
           
           <span className="video-card-music">
            <span class="material-icons">music_note</span>
            
            <marquee>some song</marquee>
            
           </span>

           <span class="material-icons-outlined video-card-comment"
            onClick ={
               (e)=>{
                   if(commentBoxOpen){
                       setcommentBoxOpen(false);
                   }
                   else{
                       setcommentBoxOpen(true);
                   }
               }
            }
         
           >chat</span>

            <span class="material-icons-outlined video-card-like"
                onClick = {
                    
                    () => {
                        let likesArr = props.data.likes; 

                        if (currUserLiked){
                           let newLikesArr = [];

                           for(let i=0;i<likesArr.length;i++){
                               if(likesArr[i] !== user.uid){
                                   newLikesArr.push(likesArr[i]);
                               }
                           }

                           likesArr = newLikesArr; 
                        }
                        else{
                             likesArr.push(user.uid);
                        }

                         firestore.collection("posts").doc(props.data.id).update({
                             likes: likesArr,
                         })    

                    }
                }

                >
                {currUserLiked ? "favorite" : "favorite_border"} 
               
            </span> 

            {commentBoxOpen ? (

              <div className ="video-card-comment-box">


                 <div className = "actual-comments">
                   
                      {
                          Allcomments.map((el) => {
                           
                           return <div className = "post-user-comment">
                                 <img alt="" src= { el.photo } /> 
                      
                                <div>   
                                    <h5>{ el.name }</h5>
                                    <p>{ el.comment }</p>
                                    </div>

                                </div>
                            
                          })
                      }

                 
                 </div>

                 <div className="comment-form">
                 {/* jobhi mai input tag me likhunga wo meri state me save hota rahega  */}
                     <input type="text" 
                            value = {currUserComment}
                            onChange = {
                                (e)=>{
                               setcurrUserComment(e.currentTarget.value);
                            }
                        }                      
                     />
                     <button
                            onClick = {
                               async ()=>{
                                  //jo current comment state me hai use comments collection me add kr rha hu 
                                  let docRef = await firestore.collection("comments").add({
                                       name: user.displayName,
                                       comment: currUserComment,
                                       photo : user.photoURL,
                                   })
                                
                                //taki comment post karne ke badh inpput box empty ho jaye
                                setcurrUserComment("");

                                //to jo abhi comment maine add kra hai uske document ke ref se wo comment ka document nikal lo  
                                let doc = await docRef.get();

                                //us document ki id nikal lo 
                                let commentId = doc.id;
 
                                 //ye jo video card hai jisme ye comment dal rha he uske document nikalo 
                                let postDoc = await firestore.collection("posts").doc(props.data.id).get(); 

                                 //us document me comment array hai whapr jo apne apni comment add kra h uski id insert krdo
                                let postCommentsArr = postDoc.data().comments;

                                 postCommentsArr.push(commentId);

                                 // ab ye comments array firestore jakr update krdo posts collection me
                                 await firestore.collection("posts").doc(props.data.id).update({
                                     comments : postCommentsArr,
                                 })
                                 

                                }
                            }  
                     
                     >
                     Post</button>  
                 </div>

               </div>
             ):
             ("")
             }


              <video 
                    onClick ={
                        (e) => {
                            if(playing){
                                e.currentTarget.pause();
                                setPlaying(false);
                            }
                            else{
                                e.currentTarget.play();
                                setPlaying(true);
                            }
                        }
                    }
                 loop
               src = {props.data.url}
               className="video-card-video"
              >



              </video>            

        </div> 
    );

};

export default VideoCard;