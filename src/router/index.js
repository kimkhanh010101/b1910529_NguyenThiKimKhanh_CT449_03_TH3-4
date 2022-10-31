import { createWebHistory, createRouter}  from "vue-router";
import ContactBook from "@/view/ContactBook.vue";

const routes = [
    {
        path: "/",
        name:"contactbook",
        component: ContactBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name:"notfound",
        component: () => import("@/views/NotFound.vue"),

    },
];

const router = sreateRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
});
export default router;