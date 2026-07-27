import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
      path: "/",
      component: () => import("@/layout/MainLayout.vue"),
       children: [
            {
                path: "/login",
                name: "login",
                component: () => import("@/view/auth/login.vue"),
            },
            {
                path: "/",
                name: "dashboard",
                component: () => import("@/view/dasboard/dashboard.vue"),
            },
            {
                path: "/role",
                name: "role",
                component: () => import("@/view/role/role.vue"),
            },
            {
                path: "/email",
                name: "email",
                component: () => import("@/view/email/email.vue"),
            },
            {
                path: "/phone",
                name: "phone",
                component: () => import("@/view/phone/phone.vue"),
            },
            {
                path: "/contact",
                name: "contact",
                component: () => import("@/view/contact/contact.vue"),
            },
            {
                path: "/role",
                name: "role",
                component: () => import("@/view/role/role.vue"),
            },
            {
                path: "/customers",
                name: "customers",
                component: () => import("@/view/customer/customer.vue"),
            },
            {
                path: "/user",
                name: "user",
                component: () => import("@/view/user/user.vue"),
            },
            {
                path: "/settings",
                name: "settings",
                component: () => import("@/view/setting/setting.vue"),
            },
        ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;