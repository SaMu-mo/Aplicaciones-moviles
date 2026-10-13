import axios from "axios";

const IP_DE_TU_PC = "192.168.18.18";
const api = axios.create({
  baseURL: `http://${IP_DE_TU_PC}:3000`,
  timeout: 15000,
});

export default api;
