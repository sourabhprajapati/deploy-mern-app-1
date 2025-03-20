import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils'
const Login = () => {
    const [loginInfo,setloginInfo]=useState({
        
        email:'',
        password:''
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{

        const {name,value}=e.target;
        const copyloginInfo = {...loginInfo};
        copyloginInfo[name]=value;
        setloginInfo(copyloginInfo)
        console.log(loginInfo)

    }
    const handleLogin=async (e)=>{
          e.preventDefault();
          const {email,password}=loginInfo;
          if( !email|| !password){
            return handleError('email and password are required ')
          }
          try {
            const url="http://localhost:8080/auth/login";
            const response=await fetch(url,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            })
            const result=await response.json();
            const {message,success,jwtToken,name,error}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name)
                setTimeout(() => {
                    navigate('/home')
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
            <h1>Login</h1>
            <form onSubmit={ handleLogin}>
               
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email"  value={loginInfo.email} name='email' placeholder='Enter your email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password"  value={loginInfo.password} name='password' placeholder='Enter your password' />
                </div>
                <button type='submit'>Login</button>
                <span>Already had a account ? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer/>
        </div>
     </>
  )
}

export default Login;