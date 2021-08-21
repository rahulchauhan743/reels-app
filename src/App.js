import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";

import AuthProvider from "./AuthProvider";
import { useEffect } from "react";


let App= () => {
  
  useEffect(() => {
       
    //add
   // firestore.collection("users").add({ body: "this is val 2" })

  //  //  get all data in that collections
  //    async function f() {
         
  //     //get() is a promise based function
          //  firestore.collection("users")-> this line takes me to the "users" collection 
          //.get() gives me the all data at that time in "users" collection in object form

  //      let querySnapshot = await firestore.collection("users").get();
             
          //  querysnapshot.docs is an array of all objects in that "users" collection 
  //       for(let i = 0 ; i < querySnapshot.docs.length ; i++){
           
             //we use .data() to get data of that object
  //         console.log(querySnapshot.docs[i].data());

  //       }  

        

  //    }
  //    f();
      
     


    //get single

    
  //   let f = async () => {

  //   //this gives you the ref of that document   (not actual document)  
  //     let docRef = firestore.collection("users").doc("Yn0y1cjISraHa9xngpqr");

  //     let documentSnapshot = await docRef.get();

  //     console.log(documentSnapshot.exists);


  //   }  

  //   f();

   } ,[]) 


  return (
    <>
      
      <AuthProvider>

        <Router>
          
          <Switch>
          
          <Route exact path="/Login">
             <Login />
          </Route> 

          <Route exact path="/">
             <Home />
          </Route>
 
          </Switch>
        

        </Router>

      </AuthProvider>
      
    </>
  );
}

export default App;