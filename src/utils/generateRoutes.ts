export const generateRoutes = (sidebarData: any) => {
  return sidebarData.map((item: any) => ({
    path: item.url,
    Component: item.Component,
  }));
};
