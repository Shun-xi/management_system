import { createRouter, createWebHistory } from "vue-router";
import store from "storejs";

import constantRoutes from "./constant.routes";
import buildDynamicRoutes from "./dynamic.routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

const CONSTANT_ROUTES_PATHS = router.getRoutes().map((route) => route.path);

router.beforeEach((to, from, next) => {
  if (CONSTANT_ROUTES_PATHS.includes(to.fullPath)) {
    next();
  } else if (router.getRoutes().length <= CONSTANT_ROUTES_PATHS.length) {
    const routingData: TroutingConfigurationInformationData | undefined =
      store.get("routingData");
    if (Array.isArray(routingData)) {
      buildDynamicRoutes(routingData);
      next(to.fullPath);
    } else {
      next("/LoginView");
    }
  } else {
    next();
  }
});

export default router;
