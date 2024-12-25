import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://employeeManage.mooo.com",
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export default axiosInstance;
