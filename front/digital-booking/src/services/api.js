import axios from "axios";

 const Api = axios.create({baseURL: "http://34.231.62.32:8080/" });

 //const Api = axios.create({baseURL: "http://localhost:8080/" });

export default Api;
