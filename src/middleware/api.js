import axios from "axios";


//Creates a new axios instance with custom settings. This is useful when you want to:
// Set default configurations that will apply to all requests made with this instance
// Have multiple instances with different configurations
// Avoid repeating the same settings across your application
const instance = axios.create({
// baseURL: "http://localhost:8080/api/v1" - Sets the base URL for all requests. This means:
// When you make a request like axios.get('/airports'), it will automatically prepend this base URL
// Full URL becomes: http://localhost:8080/api/v1/airports
// You don't need to repeat the base URL in every service call
  baseURL: "http://localhost:8080/api/v1",
});

export default instance;