import MenuLayout from "src/layouts/layout_menu.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/login_Page.vue"),
  },
  {
    path: "/menu",
    component: () => import("layouts/layout_menu.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
