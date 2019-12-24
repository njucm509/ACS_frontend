import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function route(path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/login", '/Login', "Login"),
    {
      path: '/',
      component: () => import('../pages/Home'),
      redirect: '/index/dashboard',
      children: [
        route("/index/dashboard", "/Dashboard", "Dashboard"),
        route("/test1/test1-1", '/test1/test1-1', "test1-1"),
        route("/test1/test1-2", '/test1/test1-2', "test1-2"),
        route("/test1/test1-3", '/test1/test1-3', "test1-3"),
        route("/test2/test2-1", '/test2/test2-1', "test2-1"),
        route("/test2/test2-2", '/test2/test2-2', "test2-2"),
        route("/authority/list", '/authority/list', "List"),
        route("/authority/member", '/authority/member', "member"),
        route("/authority/role", '/authority/role', "role")
      ]
    }
  ]
})
