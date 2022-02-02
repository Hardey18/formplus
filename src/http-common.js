import axios from "axios";

export default axios.create({
  baseURL:
    "https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com",
  headers: {
    "Content-type": "application/json",
  },
});
