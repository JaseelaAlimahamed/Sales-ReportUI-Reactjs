import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUserInfo, sendGoogleAuthCode } from '../services/GoogleAuth';
import './GoogleLogIn.css'


const isProd = process.env.NODE_ENV === 'production';
const REDIRECT_URI = isProd ? import.meta.env.VITE_GOOGLE_REDIRECT_URI_PROD : import.meta.env.VITE_GOOGLE_REDIRECT_URI_DEV;

function GoogleLogIn() {
  const navigate = useNavigate();

  const onGoogleLoginSuccess = async (response) => {
    try {
      const { code } = response; // Capture authorization code

      // Exchange authorization code for tokens
      const tokensResponse = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
        code: code,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token, id_token, refresh_token } = tokensResponse.data;
      console.log('Tokens response:', tokensResponse.data);

      // Fetch user info using access_token
      const userInfo = await fetchUserInfo(access_token);
      const { name, email, picture } = userInfo;

      // Prepare user data including tokens and details
      const userData = {
        email: email,
        token: id_token,
        username: name
      };
      console.log('sendng datas:', userData);

      json
      // Send user data to the backend
      await sendGoogleAuthCode(userData, navigate);
    } catch (error) {
      console.error("Error occurred during Google login:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const onGoogleLoginError = () => {
    console.log("Error occurred during login");
  };

  const login = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onError: onGoogleLoginError,
    scope: 'openid profile email',
    flow: 'auth-code',
  });

  return (
    <div>
      <button className="gsi-material-button" onClick={() => login()}>
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">Sign in with Google</span>
          <span style={{ display: 'none' }}>Sign in with Google</span>
        </div>
      </button>
    </div>
  );
}

export default GoogleLogIn;
