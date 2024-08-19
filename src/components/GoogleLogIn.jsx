import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUserInfo, sendGoogleAuthCode } from '../services/GoogleAuth';

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

      const { access_token,id_token,refresh_token } = tokensResponse.data;
      console.log('Tokens response:', tokensResponse.data);

      // Fetch user info using access_token
      const userInfo = await fetchUserInfo(access_token);
      const { name, email, picture } = userInfo;

      // Prepare user data including tokens and details
      const userData ={
      email:email,
      token:id_token,
      username:name
      };
      console.log('sendng datas:',userData);

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
      <button
        type="button"
        onClick={() => login()}
        className="w-full md:w-96 button-entrar p-3 py-2 bg-blue-400 hover:bg-blue-700 rounded-md text-white focus:outline-none font-bold"
      >
        <FontAwesomeIcon icon={faGoogle} className="text-white mr-2" />
        Sign in with Google
      </button>
    </div>
  );
}

export default GoogleLogIn;
