import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendFacebookAuthCode, fetchFacebookUserInfo } from '../services/FaceBookAuth';

function FacebookLogInBox() {
    const navigate = useNavigate();

    useEffect(() => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: import.meta.env.VITE_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });
        };

        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }, []);

    const handleFBLogin = () => {
        // Check if an access token already exists
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // Use the existing access token
                const { accessToken } = response.authResponse;
                handleLoginSuccess(accessToken);
            } else {
                // No existing access token, proceed with login
                FB.login(function (response) {
                    if (response.authResponse) {
                        handleLoginSuccess(response.authResponse.accessToken);
                    } else {
                        console.log("User cancelled login or did not fully authorize.");
                    }
                }, { scope: 'email,public_profile' });
            }
        });
    };

    const handleLoginSuccess = async (accessToken) => {
        try {
            // Fetch user info using access token
            const userInfo = await fetchFacebookUserInfo(accessToken);
            console.log(userInfo);

            // Prepare user data including tokens and details
            const userData = { access_token: accessToken };

            // Send user data to the backend
            await sendFacebookAuthCode(userData, navigate);
        } catch (error) {
            console.error("Error during Facebook login:", error);
        }
    };

    return (
        <div>
            <button className="gsi-material-button" onClick={handleFBLogin}>
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ display: 'block' }}>
                            <path fill="#4267B2" d="M22.68 0H1.32C.593 0 0 .593 0 1.32v21.36C0 23.407.593 24 1.32 24h11.7v-9.3H9.94v-3.6h3.08v-2.65c0-3.05 1.86-4.72 4.56-4.72 1.30 0 2.42.09 2.75.13v3.18h-1.89c-1.48 0-1.77.71-1.77 1.75v2.3h3.55l-.47 3.6h-3.08v9.3h6.05c.727 0 1.32-.593 1.32-1.32V1.32C24 .593 23.407 0 22.68 0z"></path>
                        </svg>
                    </div>
                    <span className="gsi-material-button-contents">Sign in with Facebook</span>
                    <span style={{ display: 'none' }}>Sign in with Facebook</span>
                </div>
            </button>
        </div>
    );
}

export default FacebookLogInBox;
