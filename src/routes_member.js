
import menu from "views/menu_member.jsx";
import explore from "views/explore.js";
import list from "views/list_member.js";
import random from "views/random_member.js";
import insert from "views/insertmenu.jsx";
import home from "views/home_member.js";
import Maps from "views/Map_member.js";
import profile from "views/profile_member.js";
import Seemore from "views/seemore_member.js";

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: home,
    layout: "/member",
  },
  {
    path: "/stat",
    name: "Research Statistics",
    icon: "nc-icon nc-chart-bar-32",
    component: random,
    layout: "/member",
  },
  {
    path: "/explore",
    name: "Research Explore",
    icon: "nc-icon nc-zoom-split",
    component: explore,
    layout: "/member",
  },
  {
    path: "/insert",
    name: "Research Insertion",
    icon: "nc-icon nc-paper",
    component: insert,
    layout: "/member",
  },
  {
    pro: true,
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-circle-10",
    component: profile,
    layout: "/member",
  }
  // {
  //   path: "/seemore",
  //   component: Seemore,
  //   layout: "/member",
  // },
];

export default routes;
