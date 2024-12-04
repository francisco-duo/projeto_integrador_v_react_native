import axios from "axios";

const api = axios.create({
    baseURL: "http://172.16.6.196:3000",
});

export default api;
