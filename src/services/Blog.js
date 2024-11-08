import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/blog`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the list of all blogs
export const getAllBlogs = async () => {
  try {
    const response = await apiClient.get();
    console.log('response ---- ', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error.response.data;
  }
};

// Function to get a blog by authorEmail
export const getBlogsByAuthormailId = async (email) => {
  try {
    const response = await apiClient.post('/getblogdatabyauthormailid', email);
    console.log('response ---- ', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error.response.data;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    console.log('response ---- ', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error.response.data;
  }
};

export const deleteBlogById = async (id) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`); // Pass the ID in the URL
    console.log('response ---- ', response);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error.response?.data || error; // Handle the error properly
  }
};

export const updateBlogById = async ({ _id, title, desc }) => {
  try {
    const loggedinuserid = localStorage.getItem('loggedinuserid') || 'himanshu.sharma@gig4ce.com'; // Assuming the user ID is stored in localStorage
    const token = localStorage.getItem('token')
    const response = await apiClient.put('/update', { _id, title, desc }, {
      headers: {
        'loggedinuserid': loggedinuserid,
        'authorization': token
      },
    });
    console.log('response ---- ', response);
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error.response.data;
  }
};

export const createNewBlog = async ({ title, desc }) => {
  try {
    const loggedinuserid = localStorage.getItem('loggedinuserid') || 'himanshu.sharma@gig4ce.com'; // Assuming the user ID is stored in localStorage
    const token = localStorage.getItem('token')
    const response = await apiClient.post('/create', { title, desc }, {
      headers: {
        'loggedinuserid': loggedinuserid,
        'authorization': token
      },
    });
    console.log('response ---- ', response);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error.response.data;
  }
};

export default apiClient;
