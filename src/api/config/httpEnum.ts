// 请求配置
export enum ResultEnum {
  SUCCESS = 200,
  ERRPR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success'
}

// 请求方法
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

// 常用的content-type
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  TEXT = 'text/plain; charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'application/x-www-form-data;charset=UTF-8'
}
