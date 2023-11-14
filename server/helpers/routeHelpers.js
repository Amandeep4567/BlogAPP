function isActiveRoute(route, currectRoute) {
  return route === currentRoute ? "active" : "";
}

module.exports = { isActiveRoute };
