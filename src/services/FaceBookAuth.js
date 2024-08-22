import axios from 'axios';

export const sendFacebookAuthCode = async (userData,navigate) => {
  try {
    console.log(userData);
    
    const response = await axios.post("http://app.nazsystem.com:5004/auth/facebook",userData);
    
    console.log(response);
    
    const { access_token } = response.data;

    if (access_token) {
      localStorage.clear();
      localStorage.setItem("access_token", access_token);

      navigate('/');
    }
  } catch (error) {
    console.error("Error occurred while sending POST request:", error);
   
  }
};

export const fetchFacebookUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        access_token: accessToken,
        fields: 'id,name,email,picture',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Facebook user info:', error);
    localStorage.setItem("error", "facebook login failed. Please try again.");
  }
};
