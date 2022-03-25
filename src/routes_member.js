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
    name: "หน้าแรก",
    icon: "nc-icon nc-satisfied",
    path: "/home",
    component: home,
    layout: "/member",
  },
  {
    path: "/menu",
    name: "เมนูอาหาร",
    icon: "nc-icon nc-book-bookmark",
    component: menu,
    layout: "/member",
  },
  {
    path: "/random",
    name: "สุ่มอาหารทั้งหมด",
    icon: "nc-icon nc-tap-01",
    component: random,
    layout: "/member",
  },
  
  {
    path: "/maps",
    name: "สุ่มอาหารจากพื้นที่ใกล้เคียง",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/member",
  },
  {
    path: "/list",
    name: "สร้างลิสต์",
    icon: "nc-icon nc-bullet-list-67",
    component: list,
    layout: "/member",
  },
  



 
  {
    pro: true,
    path: "/profile",
    name: "โปรไฟล์",
    icon: "nc-icon nc-planet",
    component: profile,
    layout: "/member",
  },
  
];
export default routes;
