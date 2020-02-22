import axios from 'axios';

//处理登录请求
export const requestLogin = params=>{
  return axios.post("user/login", params);
}
//查询全部角色
export const getRoleList = ()=>{
  return axios.get("/role/list")
}
//查询全部用户
export const getUserList = ()=>{
  return axios.get("/user/list")
}
