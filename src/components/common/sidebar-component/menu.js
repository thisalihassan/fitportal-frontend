import { Home, Box, FileText } from 'react-feather';

export const MENUITEMS = [
	{
		title: 'Dashboard',
		icon: Home,
		badgeType: 'primary',
		active: true,
		path: '/dashboard/customers',
		type: 'link'
	},

	{
		title: 'Training Plans',
		icon: Box,
		badgeType: 'primary',
		active: false,
		path: '/dashboard/training-plans',
		type: 'sub',
		children: [
			{ path: '/dashboard/training-plans', title: 'New Plans', type: 'link' },
			{ path: '/dashboard/plans', title: 'All plans', type: 'link' }
		]
	},

	{
		title: 'Invoices Manager',
		icon: FileText,
		badgeType: 'primary',
		active: false,
		type: 'sub',
		children: [
			{ path: '/dashboard/invoices', title: 'Invoices ', type: 'link' },
			{ path: '/dashboard/stats', title: 'Stats', type: 'link' }
		]
	},

	{
		title: 'Recipes',
		icon: FileText,
		badgeType: 'primary',
		active: false,
		type: 'sub',
		children: [
			{ path: '/dashboard/recipe', title: 'New Recipe ', type: 'link' },
			{ path: '/dashboard/all/recipes', title: 'All Recipe', type: 'link' }
		]
	}
];
