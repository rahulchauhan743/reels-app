import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"; 
import config from "./config.json"

// it connects our react app with firebase 
//tells firebase about about our project
  firebase.initializeApp(config);
   
  //flag => using google
  let provider = new firebase.auth.GoogleAuthProvider();

  //object jiske ander login/logout/signup 
  export const auth = firebase.auth();

  //it is used to use firestore(database) of firebase in our project 
  export const firestore = firebase.firestore();

  //it is used to use storage feature of firebase
  export const storage = firebase.storage();

  export const signInWithGoogle = () => {
    
    //ki muje popup ko use krke sign up krna with google
    auth.signInWithPopup(provider);
  };

  
  export default firebase;