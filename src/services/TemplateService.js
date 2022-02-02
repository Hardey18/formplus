import http from "../http-common";

const getAll = () => {
  return http.get("/api/v1/public/task_templates");
};

const TemplateService = { getAll };

export default TemplateService;
