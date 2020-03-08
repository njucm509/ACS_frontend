import axios from 'axios';

//处理登录请求
export const requestLogin = params=>{
  return axios.post("user/login", params);
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
//得到本机IP
export const getIP = ()=>{
  return returnCitySN["cip"]
}

//获取全部角色
export const getRoleList =()=>{
  return axios.get("/role/list")
}
//编辑用户
export const editRole =params =>{
  return axios.post("role/update",params)
}
//删除用户
export const deleteRole = params => {
  return axios.post("/role/delete", params)
}
//增加用户
export const addRole = params =>{
  return axios.post("/role/add",params)
}

//得到属性信息
export const  getAttributeList = ()=>{
  return axios.get("/attribute/list")
}
//编辑属性
export const editAttribute = params =>{
  return axios.post("/attribute/update",params)
}
//删除属性
export const deleteAttribute = params =>{
  return axios.post("/attribute/delete",params)
}
//增加属性
export const addAttribute = params =>{
  return axios.post("/attribute/add",params)
}


//得到权限信息
export const getAuthorityList = ()=>{
  return axios.get("/authority/list");
}
//修改权限信息
export const editAuthority = params =>{
  return axios.post("/authority/update",params)
}
export const  deleteAuthority = params =>{
  return axios.post("/authority/delete",params)
}
export const addAuthority = params =>{
  return axios.post("/authority/add",params)
}
