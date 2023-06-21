import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'


const Auth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignin = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, pass);
    }catch(err){
      console.log(err);
    }
  }
  // console.log(auth?.currentUser?.email)

  return (
    <div>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"></input>
      <input 
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"></input>
      <button onClick={handleSignin}>Sign in</button>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  )
}

export default Auth