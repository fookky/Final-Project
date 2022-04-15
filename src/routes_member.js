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
import menu from "views/menu_member.jsx";
import list from "views/list_member.js";
import random from "views/random_member.js";
import home from "views/home_member.js";
import Maps from "views/Map_member.js";
import profile from "views/profile_member.js";


var routes = [
  
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-satisfied",
    component: home,
    layout: "/member",
  },
  {
    path: "/menu",
    name: "Research Statistics",
    icon: "nc-icon nc-chart-bar-32",
    component: menu,
    layout: "/member",
  },
  {
    path: "/maps",
    name: "Research Explore",
    icon: "nc-icon nc-zoom-split",
    component: Maps,
    layout: "/member",
  },

  {
    pro: true,
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-circle-10",
    component: profile,
    layout: "/member",
  },
  
];
export default routes;
