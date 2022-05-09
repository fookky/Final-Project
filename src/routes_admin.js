
import menu from "views/admin_menu.jsx";
import random from "views/stat.js";
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
    name: "ค้นหางาน",
    icon: "nc-icon nc-ruler-pencil",
    component: menu,
    layout: "/admin",
  },
  {
    path: "/manage",
    name: "จัดการงาน",
    icon: "nc-icon nc-user-run",
    component: member,
    layout: "/admin",
  }
];

export default routes;
