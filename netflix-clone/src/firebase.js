import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword,
     signOut} from "firebase/auth";
import {addDoc,
     collection,
      getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDgxpUykIXdDfFNrjNJjMI6G9xbzQBGphg",
  authDomain: "netflix-clone-4727a.firebaseapp.com",
  projectId: "netflix-clone-4727a",
  storageBucket: "netflix-clone-4727a.firebasestorage.app",
  messagingSenderId: "132212599709",
  appId: "1:132212599709:web:fe02116e7f2af6579b5d74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app);
//user function
const signup= async(name,email,password)=>{
     try{
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user =res.user;
       await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
     }catch(error){
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));

     }
     
}
//login -function

const login=async (email,password)=>{
   try {
       await signInWithEmailAndPassword(auth,email,password);
   } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}
//logout function
const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};