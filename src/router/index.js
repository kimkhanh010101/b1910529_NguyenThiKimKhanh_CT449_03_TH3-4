import { createWebHistory, createRouter}  from "vue-router";
import ContactBook from "@/view/ContactBook.vue";

const routes = [
    {
        path: "/",
        name:"contactbook",
        component: ContactBook,
    },
];

const router = sreateRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
});
export default router;