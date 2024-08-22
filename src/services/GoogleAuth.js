import axios from 'axios';


export const sendGoogleAuthCode = async (code, navigate) => {
  try {
    console.log(code);
    
    const response = await axios.post("http://app.nazsystem.com:5004/auth/google",code); // Ensure the URL is correct
    const {access_token} = response.data;   
    console.log(response);
    
    if (access_token) { // Changed 'token' to 'access_token'
      localStorage.clear();
      localStorage.setItem("access_token", access_token); // Changed 'token' to 'access_token'
      navigate('/');
    }
  }catch (error) {
    console.error("Error occurred while sending POST request:", error);
  }
};

export const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const userInfo = await response.json();
      console.log('User Info:', userInfo);
      return userInfo;
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };