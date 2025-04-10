//See this offical doc: https://axios-http.com/docs/req_config
// Image in a subfolder [src/assets/AxiosInstance.png]

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default instance;