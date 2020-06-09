import React from 'react';
import * as allRouteConfig from '../component/routes';
import NotFoundPage from '../component/SharedComponent/NotFoundPage';

let RouteConfig = [];
Object.keys(allRouteConfig).forEach((index) => {
    RouteConfig.push(...allRouteConfig[index]);
});

RouteConfig.push({
    path: "*",
    component: () => <NotFoundPage />
});

export default RouteConfig;