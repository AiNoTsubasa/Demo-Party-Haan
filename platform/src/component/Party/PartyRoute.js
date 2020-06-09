import React from 'react';
import Parties from './Parties';
import PartyForm from './PartyForm';

export const PartyRoute = [
	{
		path: "/",
		component: () => <Parties />
	},
	{
		path: "/create",
		component: () => <PartyForm />
	}
];
