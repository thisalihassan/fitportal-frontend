import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';

import Ecommerce from './components/dashboard/ecommerce';

// widgets
import General from './components/widgets/general';
import Chart from './components/widgets/chart';

// Base
import Statecolor from './components/base/statecolor';
import Typography from './components/base/typography';
import Avatar from './components/base/avatar';
import HelperClass from './components/base/helperclass';
import Grid from './components/base/grid';
import TagsandPills from './components/base/tagsandpills';
import ProgressBar from './components/base/progressBar';
import ModalComponent from './components/base/modalComponent';
import AlertComponent from './components/base/Alert/Alert';
import PopoverComponent from './components/base/Popover/Popover';
import TooltipsComponent from './components/base/tooltipsComponent';
import Spinner from './components/base/spinner';
import DropdownComponent from './components/base/DropDown/Dropdown';
import TabBootstrap from './components/base/Tabs/TabBootstrap';
import TabLine from './components/base/Tabs/TabLine';
import Accordion from './components/base/Accordian/Accordian';
import Navs from './components/base/Nav/Navs';
import List from './components/base/lists/list';
import Shadow from './components/base/shadow';

// Advance
import Scrollable from './components/advance/scrollable';
import Toastr from './components/advance/toastr';
import RatingComponent from './components/advance/ratingComponent';
import DropzoneComponent from './components/advance/dropzone';
import TourComponent from './components/advance/tourComponent';
import SweetAlert from './components/advance/sweetAlert';
import SlickSlider from './components/advance/slickSlider';
import CarouselComponent from './components/advance/Carousels/carouselComponent';
import Ribbon from './components/advance/ribbon';
import Pagination from './components/advance/pagination';
import Steps from './components/advance/steps';
import UIBreadCrumb from './components/advance/uibreadcrumb';
import RangeSlider from './components/advance/rangeSlider';
import ImageCropper from './components/advance/imageCropper';
import StickyNotes from './components/advance/stickyNotes';
import DragNDropComp from './components/advance/drag-n-drop/dragNDropComp';
import UploadImage from './components/advance/uploadImage';

// icons
import FlagIcons from './components/icons/flagIcons';
import FontAwsomeIcon from './components/icons/fontAwsomeIcon';
import IcoIcons from './components/icons/icoIcons';
import ThemifyIcons from './components/icons/themifyIcons';
import FeatherIcons from './components/icons/featherIcons';
import WeatherIcons from './components/icons/weatherIcons';

// buttons
import DefaultBtn from './components/buttons/default-btn';
import FlatBtn from './components/buttons/flatBtn';
import EdgeBtn from './components/buttons/edgeBtn';
import RaisedBtn from './components/buttons/raisedBtn';
import GroupBtn from './components/buttons/groupBtn';

// forms
import FormValidation from './components/forms/form-control/form-validation';
import BaseInput from './components/forms/form-control/baseInput';
import RadioCheckbox from './components/forms/form-control/radio-checkbox';
import InputGroupComp from './components/forms/form-control/inputGroup';
import MegaOptions from './components/forms/form-control/megaOptions';

import DatepickerComponent from './components/forms/form-widgets/datepickerComponent';
import TimePickerWrapper from './components/forms/form-widgets/timepickerComponent/timepicker';
import TypeaheadComp from './components/forms/form-widgets/typeaheadComponent/typeahead';

import FormDefault from './components/forms/form-layout/formDefault';

// tables
import BasicTable from './components/tables/bootstrap/basicTable';
import StylingTable from './components/tables/bootstrap/stylingTable';
import BorderTable from './components/tables/bootstrap/borderTable';
import SizingTable from './components/tables/bootstrap/sizingTable';
import DataTableComponent from './components/tables/dataTableComponent';

// cards
import BasicCards from './components/cards/basicCards';
import CreativeCards from './components/cards/creativeCards';
import TabCard from './components/cards/tabCard';
import DraggingCards from './components/cards/draggingCards';

// users
import UserProfile from './components/users/userProfile';
import UserEdit from './components/users/userEdit';
import UserCards from './components/users/user-cards';

import LoginWithBgImg from './pages/loginWithBgImg';
import LoginWithVideo from './pages/loginWithVideo';
import Signup from './auth/signup';
import SignupWithImg from './pages/signupWithImg';
import SignupWithVideo from './pages/signupWithVideo';
import UnlockUser from './pages/unlockUser';
import ForgetPwd from './pages/forgetPwd';
import ResetPwd from './pages/resetPwd';
import ComingSoon from './pages/comingsoon';
import ComingSoonImg from './pages/comingsoonImg';
import ComingSoonVideo from './pages/comingsoonVideo';
import Maintenance from './pages/maintenance';
import Error400 from './pages/errors/error400';
import Error401 from './pages/errors/error401';
import Error403 from './pages/errors/error403';
import Error404 from './pages/errors/error404';
import Error500 from './pages/errors/error500';
import Error503 from './pages/errors/error503';
import Signin from './auth/signin';
import Conformation from './auth/confirmation';
//config data
import configDB from './data/customizer/config';
import Callback from './auth/callback';

const Root = () => {
	const jwt_token = localStorage.getItem('id_token');

	useEffect(() => {
		const color = localStorage.getItem('color');
		const layout = localStorage.getItem('layout_version') || configDB.data.color.layout_version;
		document.body.classList.add(layout);
		console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
		console.disableYellowBox = true;
		document.getElementById('color').setAttribute('href', `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
	}, []);

	return (
		<div className='App'>
			<Provider store={store}>
				<BrowserRouter basename={`/`}>
					<Switch>
						<Route path={`${process.env.PUBLIC_URL}/conformation/:id/:token`} component={Conformation} />
						<Route path={`${process.env.PUBLIC_URL}/login`} component={Signin} />
						<Route path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
						<Route path={`${process.env.PUBLIC_URL}/pages/loginWithBgImg`} component={LoginWithBgImg} />
						<Route path={`${process.env.PUBLIC_URL}/pages/loginWithVideo`} component={LoginWithVideo} />

						<Route path={`${process.env.PUBLIC_URL}/pages/signupWithImg`} component={SignupWithImg} />
						<Route path={`${process.env.PUBLIC_URL}/pages/signupWithVideo`} component={SignupWithVideo} />
						<Route path={`${process.env.PUBLIC_URL}/pages/unlockUser`} component={UnlockUser} />
						<Route path={`${process.env.PUBLIC_URL}/pages/forgetPwd`} component={ForgetPwd} />
						<Route path={`${process.env.PUBLIC_URL}/pages/resetPwd`} component={ResetPwd} />
						<Route path={`${process.env.PUBLIC_URL}/pages/comingsoon`} component={ComingSoon} />
						<Route path={`${process.env.PUBLIC_URL}/pages/comingsoonImg`} component={ComingSoonImg} />
						<Route path={`${process.env.PUBLIC_URL}/pages/comingsoonVideo`} component={ComingSoonVideo} />
						<Route path={`${process.env.PUBLIC_URL}/pages/maintenance`} component={Maintenance} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error400`} component={Error400} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error401`} component={Error401} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error403`} component={Error403} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error404`} component={Error404} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error500`} component={Error500} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error503`} component={Error503} />
						<Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />

						{jwt_token ? (
							<App>
								{/* dashboard menu */}
								<Route
									exact
									path={`${process.env.PUBLIC_URL}/`}
									render={() => {
										return <Redirect to={`${process.env.PUBLIC_URL}/dashboard`} />;
									}}
								/>
								<Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Ecommerce} />

								{/* Widgets Menu */}
								<Route path={`${process.env.PUBLIC_URL}/widgets/general`} component={General} />
								<Route path={`${process.env.PUBLIC_URL}/widgets/chart`} component={Chart} />

								{/* base */}
								<Route path={`${process.env.PUBLIC_URL}/base/statecolor`} component={Statecolor} />
								<Route path={`${process.env.PUBLIC_URL}/base/typography`} component={Typography} />
								<Route path={`${process.env.PUBLIC_URL}/base/avatar`} component={Avatar} />
								<Route path={`${process.env.PUBLIC_URL}/base/grid`} component={Grid} />
								<Route path={`${process.env.PUBLIC_URL}/base/helperclass`} component={HelperClass} />
								<Route path={`${process.env.PUBLIC_URL}/base/tagsandpills`} component={TagsandPills} />
								<Route path={`${process.env.PUBLIC_URL}/base/progressBar`} component={ProgressBar} />
								<Route path={`${process.env.PUBLIC_URL}/base/modalComponent`} component={ModalComponent} />
								<Route path={`${process.env.PUBLIC_URL}/base/alert`} component={AlertComponent} />
								<Route path={`${process.env.PUBLIC_URL}/base/popoverComponent`} component={PopoverComponent} />
								<Route path={`${process.env.PUBLIC_URL}/base/tooltipsComponent`} component={TooltipsComponent} />
								<Route path={`${process.env.PUBLIC_URL}/base/spinner`} component={Spinner} />
								<Route path={`${process.env.PUBLIC_URL}/base/dropdownComponent`} component={DropdownComponent} />
								<Route path={`${process.env.PUBLIC_URL}/base/tabs/tab-bootstrap`} component={TabBootstrap} />
								<Route path={`${process.env.PUBLIC_URL}/base/tabs/tab-line`} component={TabLine} />
								<Route path={`${process.env.PUBLIC_URL}/base/accordion`} component={Accordion} />
								<Route path={`${process.env.PUBLIC_URL}/base/navs`} component={Navs} />
								<Route path={`${process.env.PUBLIC_URL}/base/shadow`} component={Shadow} />
								<Route path={`${process.env.PUBLIC_URL}/base/list`} component={List} />

								{/* Advance */}
								<Route path={`${process.env.PUBLIC_URL}/advance/scrollable`} component={Scrollable} />
								<Route path={`${process.env.PUBLIC_URL}/advance/bootstrap-notify`} component={Toastr} />
								<Route path={`${process.env.PUBLIC_URL}/advance/ratingComponent`} component={RatingComponent} />
								<Route path={`${process.env.PUBLIC_URL}/advance/dropzone`} component={DropzoneComponent} />
								<Route path={`${process.env.PUBLIC_URL}/advance/tourComponent`} component={TourComponent} />
								<Route path={`${process.env.PUBLIC_URL}/advance/sweetAlert`} component={SweetAlert} />
								<Route path={`${process.env.PUBLIC_URL}/advance/slick-slider`} component={SlickSlider} />
								<Route path={`${process.env.PUBLIC_URL}/advance/carouselComponent`} component={CarouselComponent} />
								<Route path={`${process.env.PUBLIC_URL}/advance/ribbon`} component={Ribbon} />
								<Route path={`${process.env.PUBLIC_URL}/advance/pagination`} component={Pagination} />
								<Route path={`${process.env.PUBLIC_URL}/advance/steps`} component={Steps} />
								<Route path={`${process.env.PUBLIC_URL}/advance/uibreadcrumb`} component={UIBreadCrumb} />
								<Route path={`${process.env.PUBLIC_URL}/advance/rangeSlider`} component={RangeSlider} />
								<Route path={`${process.env.PUBLIC_URL}/advance/imageCropper`} component={ImageCropper} />
								<Route path={`${process.env.PUBLIC_URL}/advance/stickyNotes`} component={StickyNotes} />
								<Route path={`${process.env.PUBLIC_URL}/advance/dragNDropComp`} component={DragNDropComp} />
								<Route path={`${process.env.PUBLIC_URL}/advance/uploadImage`} component={UploadImage} />

								{/* icons */}
								<Route path={`${process.env.PUBLIC_URL}/icons/flagIcons`} component={FlagIcons} />
								<Route path={`${process.env.PUBLIC_URL}/icons/fontAwsomeIcon`} component={FontAwsomeIcon} />
								<Route path={`${process.env.PUBLIC_URL}/icons/icoIcons`} component={IcoIcons} />
								<Route path={`${process.env.PUBLIC_URL}/icons/themifyIcons`} component={ThemifyIcons} />
								<Route path={`${process.env.PUBLIC_URL}/icons/featherIcons`} component={FeatherIcons} />
								<Route path={`${process.env.PUBLIC_URL}/icons/weatherIcons`} component={WeatherIcons} />

								{/* buttons */}
								<Route path={`${process.env.PUBLIC_URL}/buttons/default-btn`} component={DefaultBtn} />
								<Route path={`${process.env.PUBLIC_URL}/buttons/flatBtn`} component={FlatBtn} />
								<Route path={`${process.env.PUBLIC_URL}/buttons/edgeBtn`} component={EdgeBtn} />
								<Route path={`${process.env.PUBLIC_URL}/buttons/raisedBtn`} component={RaisedBtn} />
								<Route path={`${process.env.PUBLIC_URL}/buttons/groupBtn`} component={GroupBtn} />

								{/* Forms */}
								<Route path={`${process.env.PUBLIC_URL}/forms-controls/form-validation`} component={FormValidation} />
								<Route path={`${process.env.PUBLIC_URL}/forms-controls/baseInput`} component={BaseInput} />
								<Route path={`${process.env.PUBLIC_URL}/forms-controls/radio-checkbox`} component={RadioCheckbox} />
								<Route path={`${process.env.PUBLIC_URL}/forms-controls/inputGroup`} component={InputGroupComp} />
								<Route path={`${process.env.PUBLIC_URL}/forms-controls/megaOptions`} component={MegaOptions} />

								<Route path={`${process.env.PUBLIC_URL}/form-layout/formDefault`} component={FormDefault} />
								{/* <Route path={`${process.env.PUBLIC_URL}/form-layout/FormWizard`} component={FormWizard} /> */}

								<Route path={`${process.env.PUBLIC_URL}/form-widget/datepickerComponent`} component={DatepickerComponent} />
								<Route path={`${process.env.PUBLIC_URL}/form-widget/timepicker`} component={TimePickerWrapper} />
								<Route path={`${process.env.PUBLIC_URL}/form-widget/typeahead`} component={TypeaheadComp} />

								{/* Tables */}
								<Route path={`${process.env.PUBLIC_URL}/table/datatable`} component={DataTableComponent} />
								<Route path={`${process.env.PUBLIC_URL}/table/basic`} component={BasicTable} />
								<Route path={`${process.env.PUBLIC_URL}/table/sizing`} component={SizingTable} />
								<Route path={`${process.env.PUBLIC_URL}/table/border`} component={BorderTable} />
								<Route path={`${process.env.PUBLIC_URL}/table/styling`} component={StylingTable} />

								{/* cards */}
								<Route path={`${process.env.PUBLIC_URL}/cards/basicCards`} component={BasicCards} />
								<Route path={`${process.env.PUBLIC_URL}/cards/creativeCards`} component={CreativeCards} />
								<Route path={`${process.env.PUBLIC_URL}/cards/tabCard`} component={TabCard} />
								<Route path={`${process.env.PUBLIC_URL}/cards/draggingCards`} component={DraggingCards} />

								{/* Users */}
								<Route path={`${process.env.PUBLIC_URL}/users/userProfile`} component={UserProfile} />
								<Route path={`${process.env.PUBLIC_URL}/users/userEdit/:id`} component={UserEdit} />
								<Route path={`${process.env.PUBLIC_URL}/users/userCards`} component={UserCards} />
							</App>
						) : (
							<Redirect to={`${process.env.PUBLIC_URL}/login`} />
						)}
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
