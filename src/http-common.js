import axios from "axios";

export default axios.create({
  baseURL: "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates",
  headers: {
    "Content-type": "application/json",
  }
});