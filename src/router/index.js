import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/view/ContactBook.vue";

const routes = [
    {


        path: "/contacts",
        name: "contact.add",
        component: () => import(".../views/ContactAdd.vue"),
        props: true,
    },


    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),

    },
];

const router = sreateRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
});
export default router;