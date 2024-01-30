import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../App/components/Utils/Config";

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}`, {
        username: "<USERNAME>",
        password: "<PASSWORD>",
      })
      .then((res) => {
        console.log(res);
        setUserToken(res.data.token);
        AsyncStorage.setItem("token", res.data.token);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
};
