import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.interceptors.request.use((config) => {
  const authToken = AsyncStorage.getItem("token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default axios;
