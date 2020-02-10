import axios from 'axios';

let base = '';

//处理登录请求
export const requestLogin = params=>{
  return axios.post('${base}/login',params)
}
