import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserPanel from './userPanel';
import { MENUITEMS } from '../../../components/common/sidebar-component/menu';
import { Link } from 'react-router-dom';
import { translate } from 'react-switch-lang';
import configDB from '../../../data/customizer/config';
import authActions from "../../../redux/auth/actions"
import {withRouter} from 'react-router'
import { connect } from 'react-redux';
const { loginUser, fetchLoginDetails} = authActions;
const userRole = localStorage.getItem('role');
const Sidebar = ({ history , fetchLoginDetails, user, t}) => {
    const [margin, setMargin] = useState(0);
    const [width, setWidth] = useState(0);
    const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true);
    const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
    const [hideRightArrow, setHideRightArrow] = useState(true);
    const [hideLeftArrow, setHideLeftArrow] = useState(true);
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const wrapper = configDB.data.settings.sidebar.wrapper;
    const layout = useSelector(content => content.Customizer.layout);
    useEffect(()=> {
		if(!user){	
			fetchLoginDetails();
		}
	},[user])

    useEffect(() => {
		if(user) {
			history.push('/dashboard/customers')
		}
	}, [user]);
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize();

        var currentUrl = window.location.pathname;

        // eslint-disable-next-line
        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            // eslint-disable-next-line
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                // eslint-disable-next-line
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl) {
                        setNavActive(subSubItems)
                        return true
                    }
                    else{
                        return false
                    }
                })
                return subItems
            })
            return items
        })

        const timeout = setTimeout(() => {
            const elmnt = document.getElementById("myDIV");
            const menuWidth = elmnt.offsetWidth;
            if (menuWidth > window.innerWidth) {
                setHideRightArrow(false);
                setHideLeftArrowRTL(false);
            } else {
                setHideRightArrow(true);
                setHideLeftArrowRTL(true);
            }
        }, 500)

        return () => {
            // eslint-disable-next-line
            window.removeEventListener('resize', handleResize)
            clearTimeout(timeout)
        }
        // eslint-disable-next-line
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth - 310);
    }

    const setNavActive = (item) => {
        // eslint-disable-next-line
        MENUITEMS.filter(menuItem => {
            // eslint-disable-next-line
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                // eslint-disable-next-line
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                        return true
                    }else{
                        return false
                    }
                })
            }
            return menuItem
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    // Click Toggle menu
    const toggletNavActive = (item) => {
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    const scrollToRight = () => {
        const elmnt = document.getElementById("myDIV");
        const menuWidth = elmnt.offsetWidth;
        const temp = menuWidth + margin;
        if (temp < menuWidth) {
            setMargin(-temp);
            setHideRightArrow(true);
        }
        else {
            setMargin(margin => margin += (-width));
            setHideLeftArrow(false);
        }
    }

    const scrollToLeft = () => {
        // If Margin is reach between screen resolution
        if (margin >= -width) {
            setMargin(0)
            setHideLeftArrow(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrow(false);
        }
    }


    const scrollToLeftRTL = () => {
        if (margin <= -width) {
            setMargin(margin => margin += -width);
            setHideLeftArrowRTL(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideRightArrowRTL(false);
        }
    }

    const scrollToRightRTL = () => {
        const temp = width + margin
        // Checking condition for remaing margin
        if (temp === 0) {
            setMargin(temp);
            setHideRightArrowRTL(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrowRTL(false);
            setHideLeftArrowRTL(false);
        }
    }

    const renderItems =(menuItem, i) =>{
        return  <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
        {(menuItem.sidebartitle) ?
            <div className="sidebar-title">{menuItem.sidebartitle}</div>
            : ''}
        {(menuItem.type === 'sub') ?
            <a className="sidebar-header" href="#javascript" onClick={() => toggletNavActive(menuItem)}>
                <menuItem.icon />
                <span>{t(menuItem.title)}</span>
                <i className="fa fa-angle-right pull-right"></i>
            </a>
            : ''}
        {(menuItem.type === 'link') ?
            <Link
                to={`${menuItem.path}`}
                className={`sidebar-header ${menuItem.active ? 'active' : ''}`}

                onClick={() => toggletNavActive(menuItem)}
            >
                <menuItem.icon /><span>{t(menuItem.title)}</span>
                {menuItem.children ?
                    <i className="fa fa-angle-right pull-right"></i> : ''}
            </Link>
            : ''}
        {menuItem.children ?
            <ul
                className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
            >
                {menuItem.children.map((childrenItem, index) =>
                    <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                        {(childrenItem.type === 'sub') ?
                            <a href="#javascript" onClick={() => toggletNavActive(childrenItem)} >
                                <i className="fa fa-circle"></i>{t(childrenItem.title)} <i className="fa fa-angle-right pull-right"></i></a>
                            : ''}

                        {(childrenItem.type === 'link') ?
                            <Link
                                to={`${childrenItem.path}`}
                                className={childrenItem.active ? 'active' : ''}
                                onClick={() => toggletNavActive(childrenItem)}
                            >
                                <i className="fa fa-circle"></i>{t(childrenItem.title)} </Link>
                            : ''}
                        {childrenItem.children ?
                            <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                {childrenItem.children.map((childrenSubItem, key) =>
                                    <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                        {(childrenSubItem.type === 'link') ?
                                            <Link
                                                to={`${childrenSubItem.path}`}
                                                className={childrenSubItem.active ? 'active' : ''}
                                                onClick={() => toggletNavActive(childrenSubItem)}
                                            >
                                                <i className="fa fa-circle"></i>{t(childrenSubItem.title)}</Link>
                                            : ''}
                                    </li>
                                )}
                            </ul>
                            : ''}
                    </li>
                )}
            </ul>
            : ''}
    </li>
    }

    return (
        <Fragment>
            <div className="page-sidebar">
                <div className="sidebar custom-scrollbar">
                    {user && <UserPanel name= {user.name} role = {user.role} />}
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                            { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                    >
                        <li className={`left-arrow ${layout === 'rtl' ? hideLeftArrowRTL ? 'd-none' : '' : hideLeftArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToLeftRTL : scrollToLeft}><i className="fa fa-angle-left"></i></li>
                        {
                            MENUITEMS.map((menuItem, i) =>
                            <>
                            {menuItem.title !== 'Invoices Manager' && userRole === 'customer' &&
                            renderItems(menuItem, i) 
                            }
                            {
                                userRole !== 'customer' &&
                            renderItems(menuItem, i) 
                            }
                            </>
                               
                            )
                        }
                        <li className={`right-arrow ${layout === 'rtl' ? hideRightArrowRTL ? 'd-none' : '' : hideRightArrow ? 'd-none' : ''}`}
                            onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToRightRTL : scrollToRight}><i className="fa fa-angle-right"></i></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default translate(withRouter(connect((state) => ({
	user: state.authReducer.user,
}),{fetchLoginDetails})(Sidebar)));

