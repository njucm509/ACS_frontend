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
//编辑用户
export const editUser = params=>{
  return axios.post("/user/update",params)
}
//删除用户
export const deleteUser = params=>{
  return axios.post("/user/delete",params)
}
//增加用户
export const addUser = params=>{
  return axios.post("/user/add",params)
}

export const getIP = ()=>{
  return returnCitySN["cip"]
}
