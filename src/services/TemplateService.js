import http from '../http-common'

const getAll = () => {
    return http.get("/");
  };

const TemplateService = { getAll }

export default TemplateService;