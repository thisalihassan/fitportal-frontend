import { Home, Box, Users, FolderPlus, Command, Cloud, Book, FileText, Server, Lock, BarChart } from 'react-feather';

export const MENUITEMS = [
	{
		title: 'Dashboard',
		icon: Home,
		badgeType: 'primary',
		active: false,
		path: '/dashboard',
		type: 'link'
	},

	{
		title: 'Base',
		icon: Box,
		type: 'sub',
		active: false,
		children: [
			{ path: '/base/statecolor', title: 'State-color', type: 'link' },
			{ path: '/base/typography', title: 'Typography', type: 'link' },
			{ path: '/base/avatar', title: 'Avatars', type: 'link' },
			{ path: '/base/helperclass', title: 'Helper-Classes  ', type: 'link' },
			{ path: '/base/grid', title: 'Grid', type: 'link' },
			{ path: '/base/tagsandpills', title: 'Tag & Pills', type: 'link' },
			{ path: '/base/progressBar', title: 'Progress', type: 'link' },
			{ path: '/base/modalComponent', title: 'Modal', type: 'link' },
			{ path: '/base/alert', title: 'Alert', type: 'link' },
			{ path: '/base/popoverComponent', title: 'Popover', type: 'link' },
			{ path: '/base/tooltipsComponent', title: 'Tooltip', type: 'link' },
			{ path: '/base/spinner', title: 'Spinners', type: 'link' },
			{ path: '/base/dropdownComponent', title: 'Dropdown ', type: 'link' },
			{
				title: 'Tabs ',
				type: 'sub',
				children: [
					{ title: 'Bootstrap Tabs', type: 'link', path: '/base/tabs/tab-bootstrap' },
					{ title: 'Line Tabs', type: 'link', path: '/base/tabs/tab-line' }
				]
			},
			{ path: '/base/accordion', title: 'Accordion', type: 'link' },
			{ path: '/base/navs', title: 'Nav', type: 'link' },
			{ path: '/base/shadow', title: 'Shadow', type: 'link' },
			{ path: '/base/list', title: 'List', type: 'link' }
		]
	},
	{
		title: 'Advance',
		icon: FolderPlus,
		type: 'sub',
		active: false,
		children: [
			{ path: '/advance/scrollable', title: 'Scrollable ', type: 'link' },
			{ path: '/advance/bootstrap-notify', title: 'Bootstrap Notify', type: 'link' },
			{ path: '/advance/ratingComponent', title: 'Rating', type: 'link' },
			{ path: '/advance/dropzone', title: 'Dropzone', type: 'link' },
			{ path: '/advance/tourComponent', title: 'Tour ', type: 'link' },
			{ path: '/advance/sweetAlert', title: 'SweetAlert ', type: 'link' },
			{ path: '/advance/slick-slider', title: 'Slick Slider', type: 'link' },
			{ path: '/advance/carouselComponent', title: 'Carousel', type: 'link' },
			{ path: '/advance/ribbon', title: 'Ribbons', type: 'link' },
			{ path: '/advance/pagination', title: 'Pagination', type: 'link' },
			{ path: '/advance/steps', title: 'Steps', type: 'link' },
			{ path: '/advance/uibreadcrumb', title: 'Breadcrumb ', type: 'link' },
			{ path: '/advance/rangeSlider', title: 'Range Slider ', type: 'link' },
			{ path: '/advance/imageCropper', title: 'Image Cropper ', type: 'link' },
			{ path: '/advance/stickyNotes', title: 'Sticky ', type: 'link' },
			{ path: '/advance/dragNDropComp', title: 'Drag and Drop ', type: 'link' },
			{ path: '/advance/uploadImage', title: 'Upload ', type: 'link' }
		]
	},
	{
		title: 'Icons',
		icon: Command,
		type: 'sub',
		active: false,
		children: [
			{ path: '/icons/flagIcons', title: 'Flag Icon', type: 'link' },
			{ path: '/icons/fontAwsomeIcon', title: 'Fontawesome Icon ', type: 'link' },
			{ path: '/icons/icoIcons', title: 'Ico Icon ', type: 'link' },
			{ path: '/icons/themifyIcons', title: 'Themify Icon ', type: 'link' },
			{ path: '/icons/featherIcons', title: 'Feather Icon ', type: 'link' },
			{ path: '/icons/weatherIcons', title: 'Whether Icon ', type: 'link' }
		]
	},
	{
		title: 'Buttons',
		icon: Cloud,
		type: 'sub',
		active: false,
		children: [
			{ path: '/buttons/default-btn', title: 'Default Style ', type: 'link' },
			{ path: '/buttons/flatBtn', title: 'Flat Style', type: 'link' },
			{ path: '/buttons/edgeBtn', title: 'Edge Style', type: 'link' },
			{ path: '/buttons/raisedBtn', title: 'Raised Style', type: 'link' },
			{ path: '/buttons/groupBtn', title: 'Button Group', type: 'link' }
		]
	},

	{
		title: 'Forms',
		icon: FileText,
		type: 'sub',
		active: false,
		children: [
			{
				title: ' Form Controls ',
				type: 'sub',
				children: [
					{ title: 'Form Validation', type: 'link', path: '/forms-controls/form-validation' },
					{ title: 'Basic Input', type: 'link', path: '/forms-controls/baseInput' },
					{ title: 'Checkbox & Radio', type: 'link', path: '/forms-controls/radio-checkbox' },
					{ title: 'Input Groups', type: 'link', path: '/forms-controls/inputGroup' },
					{ title: 'Mega Option', type: 'link', path: '/forms-controls/megaOptions' }
				]
			},

			{
				title: 'Form Widgets',
				type: 'sub',
				children: [
					{ path: '/form-widget/datepickerComponent', title: 'Datepicker ', type: 'link' },
					{ path: '/form-widget/timepicker', title: 'Timepicker', type: 'link' },
					{ path: '/form-widget/typeahead', title: 'Typeahead', type: 'link' }
				]
			},

			{
				title: 'Form Layout',
				type: 'sub',
				children: [
					{ path: '/form-layout/formDefault', title: 'Default Form', type: 'link' },
					{ path: '/form-layout/FormWizard', title: 'From Wizard', type: 'link' }
				]
			}
		]
	},
	{
		title: 'Tables',
		icon: Server,
		type: 'sub',
		children: [
			{
				title: ' Bootstrap Table ',
				type: 'sub',
				children: [
					{ title: 'Basic Table', type: 'link', path: '/table/basic' },
					{ title: 'Sizing Table', type: 'link', path: '/table/sizing' },
					{ title: 'Border Table', type: 'link', path: '/table/border' },
					{ title: 'Styling Table', type: 'link', path: '/table/styling' }
				]
			},
			{
				title: 'Data Tables',
				path: '/table/datatable',
				type: 'link'
			}
		]
	},
	{
		title: 'Cards',
		icon: Book,
		type: 'sub',
		active: false,
		children: [
			{ path: '/cards/basicCards', title: 'Basic Card ', type: 'link' },
			{ path: '/cards/creativeCards', title: 'Creative Card ', type: 'link' },
			{ path: '/cards/tabCard', title: 'Tabbed Card ', type: 'link' },
			{ path: '/cards/draggingCards', title: 'Draggable Card', type: 'link' }
		]
	},

	{
		title: 'Charts',
		icon: BarChart,
		type: 'sub',
		active: false,
		children: [
			{ path: '/charts/googleChart', type: 'link', title: 'Google Chart' },
			{ path: '/charts/chartJs', type: 'link', title: 'Chartjs' },
			{ path: '/charts/chartistComponent', type: 'link', title: 'Chartist' },
			{ path: '/knob/knob-charts', type: 'link', title: 'Knob Chart' }
		]
	},

	{
		title: 'Users',
		icon: Users,
		type: 'sub',
		active: false,
		children: [
			{ path: '/users/userProfile', type: 'link', title: 'Users Profile ' },
			{ path: '/users/userEdit', type: 'link', title: 'Users Edit' },
			{ path: '/users/userCards', type: 'link', title: 'Users Cards' }
		]
	},

	// {
	//     title: 'To-Do', icon: Mic, type: 'link', path: '/todo-app/todo', active: false
	// },
	// {
	//     title: 'To-Do-Firebase', icon: Mic, type: 'link', path: '/todo-app/todo-firebase', active: false
	// },
	// {
	//     title: 'Ecommerce', icon: ShoppingBag, type: 'sub', active: false, children: [
	//         { path: '/ecommerce/product', title: 'Product', type: 'link' },
	//         { path: '/ecommerce/product-detail/1', title: 'Product Page', type: 'link' },
	//         { path: '/ecommerce/product-list', title: 'Product List', type: 'link' },
	//         { path: '/ecommerce/payment', title: 'Payment Detail', type: 'link' },
	//         { path: '/ecommerce/history', title: 'Order History ', type: 'link' },
	//     ]
	// },
	// {
	//     title: 'Pricing', icon: DollarSign, path: '/price/pricing', type: 'link', active: false
	// },
	// {
	//     path: '/sample/samplepage', title: 'Sample Page', icon: File, type: 'link', active: false
	// },
	// {
	//     path: '/search/searchpage', title: 'Search Pages', icon: Search, type: 'link', active: false
	// },
	// {
	//     title: 'Error Pages', icon: AlertOctagon, type: 'sub', active: false, children: [
	//         { path: '/pages/errors/error400', title: 'Error 400', type: 'link' },
	//         { path: '/pages/errors/error401', title: 'Error 401', type: 'link' },
	//         { path: '/pages/errors/error403', title: 'Error 403', type: 'link' },
	//         { path: '/pages/errors/error404', title: 'Error 404', type: 'link' },
	//         { path: '/pages/errors/error500', title: 'Error 500', type: 'link' },
	//         { path: '/pages/errors/error503', title: 'Error 503', type: 'link' },
	//     ]
	// },
	{
		title: 'Authentication',
		icon: Lock,
		type: 'sub',
		active: false,
		children: [
			{ path: '/pages/login', type: 'link', title: 'Login Simple' },
			{ path: '/pages/loginWithBgImg', type: 'link', title: 'Login With Bg Image' },
			{ path: '/pages/loginWithVideo', type: 'link', title: 'Login With Bg Video' },
			{ path: '/pages/signup', type: 'link', title: 'Register Simple ' },
			{ path: '/pages/signupWithImg', type: 'link', title: 'Register With Bg Image ' },
			{ path: '/pages/signupWithVideo', type: 'link', title: 'Register With Bg Video ' },
			{ path: '/pages/unlockUser', type: 'link', title: 'Unlock User' },
			{ path: '/pages/forgetPwd', type: 'link', title: 'Forget Password ' },
			{ path: '/pages/resetPwd', type: 'link', title: 'Reset Password ' }
		]
	}
	// {
	//     title: 'Coming Soon', type: 'sub', icon: Briefcase, active: false, children: [
	//         { path: '/pages/comingsoon', title: 'Coming Simple', type: 'link' },
	//         { path: '/pages/comingsoonImg', title: 'Coming With Bg Image', type: 'link' },
	//         { path: '/pages/comingsoonVideo', title: 'Coming With Bg Video', type: 'link' },
	//     ]
	// },
	// {
	//     title: 'Maintenance', icon: Settings, path: '/pages/maintenance', type: 'link', active: false
	// }
];
