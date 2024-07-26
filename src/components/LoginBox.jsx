import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogInAdmin } from '../services/AdminAxios';
import './LoginBox.css';

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

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-group">

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
                        {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                <div className="form-actions">
                    <button type="submit" className="login-button">Login</button>
                </div>
                <div className="register-link">
                    <span>Don't have an account? </span>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginBox;
