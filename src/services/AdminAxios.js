import axios from "../api/axios";

export const LogInAdmin = async (username, password) => {
    const LOGIN_URL = "/login";

    try {

        const payload = `{"username":"${username}","password":"${password}"}`;

        const response = await axios.post(
            LOGIN_URL,
            payload,
            {
                headers: { "Content-Type": "application/json" },

            }
        );
        const { data } = response;
        console.log("Login successful:", data);
        localStorage.clear();
        localStorage.setItem("access_token", data.access_token[0]);
        return data
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
};

export const fetchEnquiries = async () => {
    const token = localStorage.getItem('access_token');
    const ENQUIRELIST_URL = '/enquiry'
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(ENQUIRELIST_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        throw error;
    }
};


export const fetchEnquiry = async (enquiryId) => {
    try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`/enquiry/${enquiryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data[0]);
        return response.data[0];
    } catch (error) {
        console.error('Failed to fetch enquiry:', error);
        throw error;
    }
};



export const updateEnquiry = async (formData) => {
    try {
        const token = localStorage.getItem("access_token");
        const response = await axios.put('/enquiry/update', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data.message || 'Update successful';
    } catch (error) {
        console.error('Failed to update enquiry:', error);
        throw new Error('Failed to update enquiry');
    }
};

export const addEnquiry = async (formDatas) => {
    console.log(formDatas);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post( '/addenquiry', formDatas,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to add enquiry:', error);
      throw error;
    }
  };

  export const deleteEnquiry = async (enquiry_id) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.delete(`/enquiry/delete/${enquiry_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };



  