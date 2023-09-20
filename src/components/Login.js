import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import {auth,provider} from "../firebase";
import { useNavigate } from 'react-router-dom';


export default function Login(props) {

  const navigate = useNavigate();

  const pleaseLogIn = ()=>
  {
    signInWithPopup(auth,provider)
    .then(()=>
    {
      const userName = auth.currentUser.displayName;
      const email = auth.currentUser.email;
      props.info(true);
      navigate("/home");
    })
    .catch((error)=>
    {
      console.log(error);
    })
  }

  return (
    <div style={{margin:"5px"}}>
      <button className="btn btn-outline-primary" onClick={pleaseLogIn}>SignIn with Google</button>
    </div>
  )
}
