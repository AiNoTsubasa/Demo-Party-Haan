import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import RouteConfig from '../../config/RouteConfig';

export default function AppRouter() {
	return (
		<Router>
			<Switch>
				{RouteConfig.map((route, i) => (
					route.path === '/' ? <Route key={i} exact path={route.path} component={route.component} /> : <Route key={i} path={route.path} component={route.component} />
          		))}
			</Switch>
		</Router>
	);
}