import React, { useState } from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink, UncontrolledTooltip, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";

import { changeLayoutMode } from "../../redux/actions";


//Import Images
// import logo from "../../assets/images/logo.svg"
import avatar1 from "../../assets/images/users/avatar-1.jpg";

//i18n
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// falgs
import usFlag from "../../assets/images/flags/us.jpg";
import spain from "../../assets/images/flags/spain.jpg";
import germany from "../../assets/images/flags/germany.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import russia from "../../assets/images/flags/russia.jpg";

function LeftSidebarMenu(props) {
    const dispatch = useDispatch();
    //TODO: cause unnecessary renders. Need to redevelop it
    const { layoutMode } = useSelector(state => ({
        layoutMode: state.Layout.layoutMode,
      }));

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

      const mode =
      layoutMode === "dark"
        ? "light"
        : "dark";

    const onChangeLayoutMode = (value) => { 
        if (changeLayoutMode) {
            dispatch(changeLayoutMode(value));
        }
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
    const [lng, setlng] = useState("English");


    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    const toggleMobile = () => setDropdownOpenMobile(!dropdownOpenMobile);

    /* changes language according to clicked language menu item */
    const changeLanguageAction = (lng) => {

        /* set the selected language to i18n */
        i18n.changeLanguage(lng);

        if (lng === "sp")
            setlng("Spanish");
        else if (lng === "gr")
            setlng("German");
        else if (lng === "rs")
            setlng("Russian");
        else if (lng === "it")
            setlng("Italian");
        else if (lng === "eng")
            setlng("English");
    }

    return (
        <React.Fragment>
            <div className="side-menu flex-lg-column me-lg-1">
                {/* Start side-menu nav */}
                <div className="flex-lg-column my-auto">
                    <Nav pills className="side-menu-nav justify-content-center" role="tablist">
                        <NavItem id="profile">
                            <RouterNavLink to="/profile" id="pills-user-tab" className="nav-link" activeclassname="active">
                                <i className="ri-user-2-line"></i>
                            </RouterNavLink>
                        </NavItem>
                        <UncontrolledTooltip target="profile" placement="top">
                            {t('Profile')}
                        </UncontrolledTooltip>
                        <NavItem id="Chats">
                            <RouterNavLink to="/chats" id="pills-chat-tab" className="nav-link" activeclassname="active">
                                <i className="ri-message-3-line"></i>
                            </RouterNavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Chats" placement="top">
                            {t('Chats')}
                        </UncontrolledTooltip>
                        <NavItem id="Settings">
                            <RouterNavLink to="/settings" id="pills-setting-tab" className="nav-link" activeclassname="active">
                                <i className="ri-settings-2-line"></i>
                            </RouterNavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Settings" placement="top">
                            {t('Settings')}
                        </UncontrolledTooltip>
                        <Dropdown nav isOpen={dropdownOpenMobile} toggle={toggleMobile} className="profile-user-dropdown d-inline-block d-lg-none dropup">
                            <DropdownToggle nav>
                                <img src={avatar1} className="profile-user rounded-circle" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="/profile">{t('Profile')} <i className="ri-profile-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem href="/settings">{t('Setting')} <i className="ri-settings-3-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/logout">{t('Log out')} <i className="ri-logout-circle-r-line float-end text-muted"></i></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </div>
                {/* end side-menu nav */}

                <div className="flex-lg-column d-none d-lg-block">
                    <Nav className="side-menu-nav justify-content-center">
                        <Dropdown nav isOpen={dropdownOpen2} className="btn-group dropup profile-user-dropdown" toggle={toggle2}>
                            <DropdownToggle nav>
                                <i className="ri-global-line"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changeLanguageAction('eng')} active={lng === "English"}>
                                    <img src={usFlag} alt="user" className="me-1" height="12" /> <span className="align-middle">{t('English')}</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('sp')} active={lng === "Spanish"}>
                                    <img src={spain} alt="user" className="me-1" height="12" /> <span className="align-middle">{t('Spanish')}</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('gr')} active={lng === "German"}>
                                    <img src={germany} alt="user" className="me-1" height="12" /> <span className="align-middle">{t('German')}</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('it')} active={lng === "Italian"}>
                                    <img src={italy} alt="user" className="me-1" height="12" /> <span className="align-middle">{t('Italian')}</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('rs')} active={lng === "Russian"}>
                                    <img src={russia} alt="user" className="me-1" height="12" /> <span className="align-middle">{t('Russian')}</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <li className="nav-item">
                            <NavLink id="light-dark"  onClick={() => onChangeLayoutMode(mode)}>
                                <i className="ri-sun-line theme-mode-icon"></i>
                            </NavLink>
                            <UncontrolledTooltip target="light-dark" placement="right">
                                {t('Dark / Light Mode')}
                            </UncontrolledTooltip>
                        </li>
                        <Dropdown nav isOpen={dropdownOpen} className="nav-item btn-group dropup profile-user-dropdown" toggle={toggle}>
                            <DropdownToggle className="nav-link" tag="a">
                                <img src={avatar1} alt="" className="profile-user rounded-circle" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/profile">{t('Profile')} <i className="ri-profile-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem href="/settings">{t('Setting')} <i className="ri-settings-3-line float-end text-muted"></i></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/logout">{t('Log out')} <i className="ri-logout-circle-r-line float-end text-muted"></i></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </div>
                {/* Side menu user */}
            </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps)(LeftSidebarMenu);