import { useState } from "react"
import axios,{AxiosRequestConfig} from 'axios';
import { useToast } from "../../hooks/useToast";

axios.defaults.baseURL = "";

export const useAxios = () => {
  
  const operation = async (params:AxiosRequestConfig) => {
    const resp = await axios.request(params);
    return resp
  } 
  return {operation};
}