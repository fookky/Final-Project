import menu from "views/admin_menu.jsx";
import random from "views/tong.js";
import Maps from "views/Map.js";
import member from "views/member_admin.js";



var routes = [
  {
    path: "/random",
    name: "Research Statistics",
    icon: "nc-icon nc-chart-bar-32",
    component: random,
    layout: "/admin",
  },
  {
    path: "/menu",
    name: "Research Explore",
    icon: "nc-icon nc-zoom-split",
    component: menu,
    layout: "/admin",
  },
  {
    path: "/member",
    name: "Research Insertion",
    icon: "nc-icon nc-paper" ,
    component: member,
    layout: "/admin",
  },

];
export default routes;
