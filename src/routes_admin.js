import menu from "views/admin_menu.jsx";
import random from "views/tong.js";
import Maps from "views/Map.js";
import member from "views/member_admin.js";



var routes = [
  {
    path: "/random",
    name: "สถิติ",
    icon: "nc-icon nc-planet",
    component: random,
    layout: "/admin",
  },
  {
    path: "/menu",
    name: "จัดการเมนู",
    icon: "nc-icon nc-ruler-pencil",
    component: menu,
    layout: "/admin",
  },
  {
    path: "/member",
    name: "จัดการสมาชิก",
    icon: "nc-icon nc-user-run" ,
    component: member,
    layout: "/admin",
  },





];
export default routes;
