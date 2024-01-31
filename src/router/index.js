import Vue from "vue";
import VueRouter from "vue-router";
import Album from "@/components/Album";
import Photo from '@/components/Photo';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Album,
		name: 'Album',
		meta: { requiresAuth: false },
	},
	{
		path: '/Photo',
		component: Photo,
		name: 'Photo',
		meta: { requiresAuth: false },
	},
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isLoggedIn = localStorage.getItem("userLogin");
  isLoggedIn = JSON.parse(isLoggedIn);
  if (to.meta.requiresAuth && JSON.parse(!isLoggedIn)) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
export default router;
