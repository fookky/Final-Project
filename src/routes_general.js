/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import menu from "views/menu.jsx";
import random from "views/random.jsx";
import home from "views/home.js";
import Maps from "views/Map.js";
import regis from "views/regis.js";
import login from "views/login.js";


var routes = [
  
  {
    name: "Home",
    icon: "nc-icon nc-satisfied",
    path: "/home",
    component: home,
    layout: "/general",
  },
  // {
  //   path: "/random",
  //   name: "Research Statistics",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: random,
  //   layout: "/general",
  // },

  // {
  //   path: "/menu",
  //   name: "Research Explore",
  //   icon: "nc-icon nc-zoom-split",
  //   component: menu,
  //   layout: "/general",
  // },

  {
    path: "/regis",
    name: "Register",
    icon: "nc-icon nc-single-02",
    component: regis,
    layout: "/general",
  },
  
  {
    pro: true,
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-spaceship",
    component: login,
    layout: "/general",
  },
  
];
export default routes;
