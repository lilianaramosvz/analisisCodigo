import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/metrics`;

export const getMetricData = async (metric) => {
  const response = await axios.get(`${API_URL}/${metric}`);
  return response.data;
};
