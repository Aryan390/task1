import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import pic from '../../assets/blank-profile-picture-973460_1280.webp'
import AuthContext from '../../store/auth-context';
import classes from './Login.module.css'

const apiKey = 'AIzaSyDZXCnflYg7DAzRQsGbJ-WPNc9Bc9trPFc'

const Login = () => {
  const history = useHistory()

  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading , setIsLoading] = useState(false);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // optional validation can be added
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;

    if(!isLogin) url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    else url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      setIsLoading(false);
      if(res.ok){
        return res.json();
      }else {
        return res.json().then(data => {
          // // show an error modal
          // console.log(data);
          let errorMessage = 'Authentication Failed!'
          if(data && data.error && data.error.message){
            errorMessage = data.error.message
          }
          throw new Error(errorMessage);
        })
      }
    }).then(data => {
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
      authCtx.login(data.idToken, expirationTime.toISOString())
      history.replace('/');
    })
    .catch(err => {
      alert(err.message)
    })
    
  } 


  return (
    <div className={classes.main}>
      <img src={pic} alt="profile pic" className={classes.pic}/>
      <form className={classes.form} onSubmit={submitHandler}>
        <input 
          type="email" 
          required 
          className={classes.field}
          placeholder={'Enter you email....'}
          ref = {emailInputRef}
        />
        <input 
          type="password" 
          required 
          className={classes.field}
          placeholder={'Enter you password....'}
          ref = {passwordInputRef}
        />
        {!isLoading ?
          <button className={classes.btn}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          : 
          <p>Sending Request...</p>
        }
        <button type='button' className={classes.btn2} onClick={switchModeHandler}>
          <p>{!isLogin ? 'Login' : 'Create Account'}</p>
        </button>
      </form>
    </div>
  )
}

export default Login