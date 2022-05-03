import { useState } from "react"
import axios from 'axios';
import { useToast } from "../../hooks/useToast";

axios.defaults.baseURL = "";

export const useAxios = () => {
  
  const operation = async (params:any) => {
    const resp = await axios.request(params);
    return resp
  } 
  return {operation};
}