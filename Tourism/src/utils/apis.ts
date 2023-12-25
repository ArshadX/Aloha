import axios from "axios";

export const baseUrl = "https://web-dev.dev.kimo.ai"

export const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {"Content-Type":"application/json"},
  });
