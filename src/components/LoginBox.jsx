import React, { useState,useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogInAdmin } from '../services/AdminAxios';
import './LoginBox.css';

import GoogleLogIn from './GoogleLogIn';

import FacebookLogInBox from './FacebookLoginBox';



function LoginBox() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

   

    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await LogInAdmin(userName, password);

            console.log(response.message);

            if (response.message === "Login Success") {
                console.log("sucess");
                navigate("/enquirelist");

            } else {
             
                setErrMsg("Login failed. Please try again.");
            }
        } catch (error) {
            
            setErrMsg("Login failed. Please try again.");
        }
    }

    return (
        <div className="login-box">

            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>

                <div className="form-input">
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-input">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-input">

                    <input
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type={passwordVisible ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <span
                        className="show-password"
                        onClick={handlePasswordToggle}
                    >
                        {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </span>
                </div>

                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>

                {errMsg && <div className="error-message" >{errMsg}</div>}

                <div className="forms-actions">
                    <button type="submit" className="login-button">Login</button>
                </div>
            </form>
            <div className="forms-actions">
                <GoogleLogIn  onError={() => setErrMsg("Google login failed. Please try again.")} />
            </div>
            <div className="forms-actions">
                
             <FacebookLogInBox/>
              
            </div>
            <div className="register-link">
                <span>Don't have an account? </span>
                <Link to="/register">Register</Link>
            </div>

        </div>
    );
}

export default LoginBox;
