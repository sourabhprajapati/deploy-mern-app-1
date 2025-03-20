import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils'
const Signup = () => {
    const [signupInfo,setsignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{

        const {name,value}=e.target;
        const copysignupInfo = {...signupInfo};
        copysignupInfo[name]=value;
        setsignupInfo(copysignupInfo)
        console.log(signupInfo)

    }
    const handleSignup=async (e)=>{
          e.preventDefault();
          const {name,email,password}=signupInfo;
          if(!name || !email|| !password){
            return handleError('name,email and password are required ')
          }
          try {
            const url="https://deploy-mern-app-1-api-delta.vercel.app/auth/signup";
            const response=await fetch(url,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            })
            const result=await response.json();
            const {message,success,error}=result;
            if(success){
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }else if(error){
                const details=error?.details[0].message
                handleError(details)
            }else if(!success){
                handleError(message)
            }
            console.log(result)
          } catch (error) {
              handleError(error)
          }
    }

  return (
     <>
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} type="text" value={signupInfo.name} name='name' placeholder='Enter your name' autoFocus/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email"  value={signupInfo.email} name='email' placeholder='Enter your email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password"  value={signupInfo.password} name='password' placeholder='Enter your password' />
                </div>
                <button type='submit'>Signup</button>
                <span>Already had a account ? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer/>
        </div>
     </>
  )
}

export default Signup
