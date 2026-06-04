//frontend\productivity-dashboard\src\services\metricsService.js
import axios from "axios";

const API_URL = "http://localhost:8080/metrics";

export const getMetricData = async (metric) => {
  const response = await axios.get(`${API_URL}/${metric}`);

  return response.data;
};
