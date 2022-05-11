import axios from 'axios'
export default function request(config) {
  const instance = axios.create({
    timeout: 5000,
    baseURL: 'localhost:8000'
  })
  // 请求拦截
  instance.interceptors.request.use(req => {
    return req
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res
  })
  return instance(config)
}