import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ListingDetailsPage from "./pages/ListingDetailsPage";

import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const detailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/details/$id",
  component: ListingDetailsPage,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  profileRoute,
  loginRoute,
  registerRoute,
  detailsRoute,
]);

export const router = new Router({ routeTree });

export default router;
