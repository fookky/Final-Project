import menu from "views/admin_menu.jsx";
import random from "views/tong.js";
import member from "views/member_admin.js";
import explore from "views/explore.js";

var routes = [
  {
    path: "/random",
    name: "Research Statistics",
    icon: "nc-icon nc-chart-bar-32",
    component: random,
    layout: "/admin",
  },
  {
    path: "/explore",
    name: "Research Explore",
    icon: "nc-icon nc-zoom-split",
    component: explore,
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
