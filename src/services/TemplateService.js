import http from "../http-common";

const getAll = () => {
  return http.get("/people");
};

const TemplateService = { getAll };

export default TemplateService;
