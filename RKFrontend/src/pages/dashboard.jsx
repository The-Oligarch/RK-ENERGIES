import { useState } from "react";
import "../App.css";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        
        <div className="layout">
            <nav className="top-app-bar navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid px-4">

                    <button className="btn btn-lg btn-icon order-1 order-lg-0" id="drawerToggle" onClick={toggleDrawer}><i className="material-icons">menu</i></button>

                    <a className="navbar-brand me-auto" href="/"><div className="text-uppercase font-monospace">RK ENERGIES</div></a>

                    <div className="d-flex align-items-center mx-3 me-lg-0">

                        

                        <div className="d-flex">

                            <div className="dropdown dropdown-notifications d-none d-sm-block">
                                <button className="btn btn-lg btn-icon dropdown-toggle me-3" id="dropdownMenuMessages" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">mail_outline</i></button>
                                <ul className="dropdown-menu dropdown-menu-end me-3 mt-3 py-0 overflow-hidden" aria-labelledby="dropdownMenuMessages">
                                    <li><h6 className="dropdown-header bg-primary text-white fw-500 py-3">Messages</h6></li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item unread" href="#!">
                                            <div className="dropdown-item-content">
                                                <div className="dropdown-item-content-text"><div className="text-truncate d-inline-block" style={{ maxWidth: '18rem' }}>Hi there, I had a question about something, is there any way you can help me out?</div></div>
                                                <div className="dropdown-item-content-subtext">Mar 12, 2023 &middot; Juan Babin</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <div className="dropdown-item-content">
                                                <div className="dropdown-item-content-text"><div className="text-truncate d-inline-block" style={{ maxWidth: '18rem' }}>Thanks for the assistance the other day, I wanted to follow up with you just to make sure everyting is settled.</div></div>
                                                <div className="dropdown-item-content-subtext">Mar 10, 2023 &middot; Christine Hendersen</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <div className="dropdown-item-content">
                                                <div className="dropdown-item-content-text"><div className="text-truncate d-inline-block" style={{ maxWidth: '18rem' }}>Welcome to our group! It's good to see new members and I know you will do great!</div></div>
                                                <div className="dropdown-item-content-subtext">Mar 8, 2023 &middot; Celia J. Knight</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item py-3" href="#!">
                                            <div className="d-flex align-items-center w-100 justify-content-end text-primary">
                                                <div className="fst-button small">View all</div>
                                                <i className="material-icons icon-sm ms-1">chevron_right</i>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown dropdown-notifications d-none d-sm-block">
                                <button className="btn btn-lg btn-icon dropdown-toggle me-3" id="dropdownMenuNotifications" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">notifications</i></button>
                                <ul className="dropdown-menu dropdown-menu-end me-3 mt-3 py-0 overflow-hidden" aria-labelledby="dropdownMenuNotifications">
                                    <li><h6 className="dropdown-header bg-primary text-white fw-500 py-3">Alerts</h6></li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item unread" href="#!">
                                            <i className="material-icons leading-icon">assessment</i>
                                            <div className="dropdown-item-content me-2">
                                                <div className="dropdown-item-content-text">Your March performance report is ready to view.</div>
                                                <div className="dropdown-item-content-subtext">Mar 12, 2023 &middot; Performance</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <i className="material-icons leading-icon">check_circle</i>
                                            <div className="dropdown-item-content me-2">
                                                <div className="dropdown-item-content-text">Tracking codes successfully updated.</div>
                                                <div className="dropdown-item-content-subtext">Mar 12, 2023 &middot; Coverage</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <i className="material-icons leading-icon">warning</i>
                                            <div className="dropdown-item-content me-2">
                                                <div className="dropdown-item-content-text">Tracking codes have changed and require manual action.</div>
                                                <div className="dropdown-item-content-subtext">Mar 8, 2023 &middot; Coverage</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider my-0" /></li>
                                    <li>
                                        <a className="dropdown-item py-3" href="#!">
                                            <div className="d-flex align-items-center w-100 justify-content-end text-primary">
                                                <div className="fst-button small">View all</div>
                                                <i className="material-icons icon-sm ms-1">chevron_right</i>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <button className="btn btn-lg btn-icon dropdown-toggle" id="dropdownMenuProfile" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">person</i></button>
                                <ul className="dropdown-menu dropdown-menu-end mt-3" aria-labelledby="dropdownMenuProfile">
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <i className="material-icons leading-icon">person</i>
                                            <div className="me-3">Profile</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <i className="material-icons leading-icon">settings</i>
                                            <div className="me-3">Settings</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#!">
                                            <i className="material-icons leading-icon">help</i>
                                            <div className="me-3">Help</div>
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="/">
                                            <i className="material-icons leading-icon">logout</i>
                                            <div className="me-3">Logout</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="main-layout">
                {/* Drawer */}
                {isDrawerOpen && (
                    <div className="drawer">
                        <nav className="drawer-menu">
                        <div className="drawer-menu-divider d-sm-none"></div>
                            
                            <div className="drawer-menu-heading">Interface</div>
                            
                            <a className="nav-link d-flex " href="index.html">
                                <div className="nav-link-icon  me-4"><i className="material-icons">language</i></div>
                                Dashboard
                            </a>
                           
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseDashboards" aria-expanded="false" aria-controls="collapseDashboards">
                                <div className="nav-link-icon"><i className="material-icons">dashboard</i></div>
                                Theme
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                           
                            <div className="collapse" id="collapseDashboards" aria-labelledby="headingOne" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav">
                                    <a className="nav-link" href="app-dashboard-default.html">Default</a>
                                    <a className="nav-link" href="app-dashboard-minimal.html">Minimal</a>
                                    <a className="nav-link" href="app-dashboard-analytics.html">Analytics</a>
                                    <a className="nav-link" href="app-dashboard-accounting.html">Accounting</a>
                                    <a className="nav-link" href="app-dashboard-orders.html">Orders</a>
                                    <a className="nav-link" href="app-dashboard-projects.html">Projects</a>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="nav-link-icon"><i className="material-icons">view_compact</i></div>
                                Layouts
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                           
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav">
                                    <a className="nav-link" href="layout-dark.html">Dark Theme</a>
                                    <a className="nav-link" href="layout-light.html">Light Theme</a>
                                    <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="nav-link-icon"><i className="material-icons">layers</i></div>
                                Pages
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                            
                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav accordion" id="drawerAccordionPages">
                                   
                                    <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAccount" aria-expanded="false" aria-controls="pagesCollapseAccount">
                                        Account
                                        <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                                    </a>
                                   
                                    <div className="collapse" id="pagesCollapseAccount" aria-labelledby="headingOne" data-bs-parent="#drawerAccordionPages">
                                        <nav className="drawer-menu-nested nav">
                                            <a className="nav-link" href="app-account-billing.html">Billing</a>
                                            <a className="nav-link" href="app-account-notifications.html">Notifications</a>
                                            <a className="nav-link" href="app-account-profile.html">Profile</a>
                                            <a className="nav-link" href="app-account-security.html">Security</a>
                                        </nav>
                                    </div>
                                    
                                    <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                                    </a>
                                  
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#drawerAccordionPages">
                                        <nav className="drawer-menu-nested nav">
                                            <a className="nav-link" href="app-auth-login-basic.html">Login 1</a>
                                            <a className="nav-link" href="app-auth-login-styled-1.html">Login 2</a>
                                            <a className="nav-link" href="app-auth-login-styled-2.html">Login 3</a>
                                            <a className="nav-link" href="app-auth-register-basic.html">Register</a>
                                            <a className="nav-link" href="app-auth-password-basic.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                    
                                    <a className="nav-link" href="app-blank-page.html">Blank Page</a>
                                   
                                    <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                                    </a>
                                    
                                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#drawerAccordionPages">
                                        <nav className="drawer-menu-nested nav">
                                            <a className="nav-link" href="app-error-400.html">400 Error Page</a>
                                            <a className="nav-link" href="app-error-401.html">401 Error Page</a>
                                            <a className="nav-link" href="app-error-403.html">403 Error Page</a>
                                            <a className="nav-link" href="app-error-404.html">404 Error Page</a>
                                            <a className="nav-link" href="app-error-429.html">429 Error Page</a>
                                            <a className="nav-link" href="app-error-500.html">500 Error Page</a>
                                            <a className="nav-link" href="app-error-503.html">503 Error Page</a>
                                            <a className="nav-link" href="app-error-504.html">504 Error Page</a>
                                        </nav>
                                    </div>
                                    
                                    <a className="nav-link" href="app-invoice.html">Invoice</a>
                                    
                                    <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#pagesCollapseKnowledgebase" aria-expanded="false" aria-controls="pagesCollapseKnowledgebase">
                                        Knowledgebase
                                        <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                                    </a>
                                    
                                    <div className="collapse" id="pagesCollapseKnowledgebase" aria-labelledby="headingOne" data-bs-parent="#drawerAccordionPages">
                                        <nav className="drawer-menu-nested nav">
                                            <a className="nav-link" href="app-knowledgebase-home.html">Home</a>
                                            <a className="nav-link" href="app-knowledgebase-categories.html">Categories</a>
                                            <a className="nav-link" href="app-knowledgebase-article.html">Article</a>
                                        </nav>
                                    </div>
                                    
                                    <a className="nav-link" href="app-pricing.html">Pricing</a>
                                </nav>
                            </div>
                            
                            <div className="drawer-menu-divider"></div>
                            
                            <div className="drawer-menu-heading">UI Toolkit</div>
                          
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseComponents" aria-expanded="false" aria-controls="collapseComponents">
                                <div className="nav-link-icon"><i className="material-icons">widgets</i></div>
                                Components
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                            
                            <div className="collapse" id="collapseComponents" aria-labelledby="headingOne" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav">
                                    <a className="nav-link" href="components-alerts.html">Alerts</a>
                                    <a className="nav-link" href="components-badges.html">Badges</a>
                                    <a className="nav-link" href="components-buttons.html">Buttons</a>
                                    <a className="nav-link" href="components-cards.html">Cards</a>
                                    <a className="nav-link" href="components-chips.html">Chips</a>
                                    <a className="nav-link" href="components-dropdowns.html">Dropdowns</a>
                                    <a className="nav-link" href="components-icon-buttons.html">Icon Buttons</a>
                                    <a className="nav-link" href="components-modals.html">Modals</a>
                                    <a className="nav-link" href="components-navigation.html">Navigation</a>
                                    <a className="nav-link" href="components-progress.html">Progress</a>
                                    <a className="nav-link" href="components-spinners.html">Spinners</a>
                                    <a className="nav-link" href="components-tooltips.html">Tooltips</a>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseContent" aria-expanded="false" aria-controls="collapseContent">
                                <div className="nav-link-icon"><i className="material-icons">amp_stories</i></div>
                                Content
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                            
                            <div className="collapse" id="collapseContent" aria-labelledby="headingOne" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav">
                                    <a className="nav-link" href="content-icons.html">Icons</a>
                                    <a className="nav-link" href="content-tables.html">Tables</a>
                                    <a className="nav-link" href="content-typography.html">Typography</a>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseForms" aria-expanded="false" aria-controls="collapseForms">
                                <div className="nav-link-icon"><i className="material-icons">description</i></div>
                                Forms
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                            
                            <div className="collapse" id="collapseForms" aria-labelledby="headingOne" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav">
                                    <a className="nav-link" href="forms-inputs.html">Inputs</a>
                                    <a className="nav-link" href="forms-checks-and-radios.html">Checks &amp; Radio</a>
                                    <a className="nav-link" href="forms-input-groups.html">Input Groups</a>
                                    <a className="nav-link" href="forms-range.html">Range</a>
                                    <a className="nav-link" href="forms-select.html">Select</a>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed d-flex align-items-center justify-content-between" href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapseUtilities" aria-expanded="false" aria-controls="collapseUtilities">
                                <div className="nav-link-icon"><i className="material-icons">build</i></div>
                                Utilities
                                <div className="drawer-collapse-arrow"><i className="material-icons">expand_more</i></div>
                            </a>
                            
                            <div className="collapse" id="collapseUtilities" aria-labelledby="headingOne" data-bs-parent="#drawerAccordion">
                                <nav className="drawer-menu-nested nav">
                                    <a className="nav-link" href="utilities-background.html">Background</a>
                                    <a className="nav-link" href="utilities-borders.html">Borders</a>
                                    <a className="nav-link" href="utilities-ripples.html">Ripples</a>
                                    <a className="nav-link" href="utilities-shadows.html">Shadows</a>
                                    <a className="nav-link" href="utilities-text.html">Text</a>
                                    <a className="nav-link" href="utilities-transforms.html">Transforms</a>
                                </nav>
                            </div>
                            
                            
                        </nav>
                        <div className="drawer-footer border-top">
                        <div className="d-flex align-items-center">
                            <i className="material-icons text-muted">account_circle</i>
                            <div className="ms-3">
                                <div className="caption">Logged in as:</div>
                                <div className="small fw-500">Start Bootstrap</div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                )}

                {/* Main Content */}
                <div className="content">
                
            
            <div id="layoutDrawer_content">
                
                <main>
                  
                    <div className="container-xl p-5">
                        <div className="row justify-content-between align-items-center mb-5">
                            <div className="col flex-shrink-0 mb-5 mb-md-0">
                                <h1 className="display-4 mb-0">Dashboard</h1>
                                <div className="text-muted">Sales overview &amp; summary</div>
                            </div>
                            <div className="col-12 col-md-auto">
                                <div className="d-flex flex-column flex-sm-row gap-3">
                                    <mwc-select className="mw-50 mb-2 mb-md-0" outlined label="View by">
                                        <mwc-list-item selected value="0">Order type</mwc-list-item>
                                        <mwc-list-item value="1">Segment</mwc-list-item>
                                        <mwc-list-item value="2">Customer</mwc-list-item>
                                    </mwc-select>
                                    <mwc-select className="mw-50" outlined label="Sales from">
                                        <mwc-list-item value="0">Last 7 days</mwc-list-item>
                                        <mwc-list-item value="1">Last 30 days</mwc-list-item>
                                        <mwc-list-item value="2">Last month</mwc-list-item>
                                        <mwc-list-item selected value="3">Last year</mwc-list-item>
                                    </mwc-select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row gx-5">
                            <div className="col-xxl-3 col-md-6 mb-5">
                                <div className="card card-raised bg-primary text-white">
                                    <div className="card-body px-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="me-2">
                                                <div className="display-5 text-white">101.1K</div>
                                                <div className="card-text">Downloads</div>
                                            </div>
                                            <div className="icon-circle bg-white-50 text-primary"><i className="material-icons">download</i></div>
                                        </div>
                                        <div className="card-text">
                                            <div className="d-inline-flex align-items-center">
                                                <i className="material-icons icon-xs">arrow_upward</i>
                                                <div className="caption fw-500 me-2">3%</div>
                                                <div className="caption">from last month</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-md-6 mb-5">
                                <div className="card card-raised bg-warning text-white">
                                    <div className="card-body px-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="me-2">
                                                <div className="display-5 text-white">12.2K</div>
                                                <div className="card-text">Purchases</div>
                                            </div>
                                            <div className="icon-circle bg-white-50 text-warning"><i className="material-icons">storefront</i></div>
                                        </div>
                                        <div className="card-text">
                                            <div className="d-inline-flex align-items-center">
                                                <i className="material-icons icon-xs">arrow_upward</i>
                                                <div className="caption fw-500 me-2">3%</div>
                                                <div className="caption">from last month</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-md-6 mb-5">
                                <div className="card card-raised bg-secondary text-white">
                                    <div className="card-body px-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="me-2">
                                                <div className="display-5 text-white">5.3K</div>
                                                <div className="card-text">Customers</div>
                                            </div>
                                            <div className="icon-circle bg-white-50 text-secondary"><i className="material-icons">people</i></div>
                                        </div>
                                        <div className="card-text">
                                            <div className="d-inline-flex align-items-center">
                                                <i className="material-icons icon-xs">arrow_upward</i>
                                                <div className="caption fw-500 me-2">3%</div>
                                                <div className="caption">from last month</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-md-6 mb-5">
                                <div className="card card-raised bg-info text-white">
                                    <div className="card-body px-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="me-2">
                                                <div className="display-5 text-white">7</div>
                                                <div className="card-text">Channels</div>
                                            </div>
                                            <div className="icon-circle bg-white-50 text-info"><i className="material-icons">devices</i></div>
                                        </div>
                                        <div className="card-text">
                                            <div className="d-inline-flex align-items-center">
                                                <i className="material-icons icon-xs">arrow_upward</i>
                                                <div className="caption fw-500 me-2">3%</div>
                                                <div className="caption">from last month</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-5">
                            
                            <div className="col-lg-8 mb-5">
                                <div className="card card-raised h-100">
                                    <div className="card-header bg-primary text-white px-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="me-4">
                                                <h2 className="card-title text-white mb-0">Revenue Breakdown</h2>
                                                <div className="card-subtitle">Compared to previous year</div>
                                            </div>
                                            <div className="d-flex gap-2 me-n2">
                                                <button className="btn btn-lg btn-text-white btn-icon" type="button"><i className="material-icons">download</i></button>
                                                <button className="btn btn-lg btn-text-white btn-icon" type="button"><i className="material-icons">print</i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="row gx-4">
                                            <div className="col-12 col-xxl-2">
                                                <div className="d-flex flex-column flex-md-row flex-xxl-column align-items-center align-items-xl-start justify-content-between">
                                                    <div className="mb-4 text-center text-md-start">
                                                        <div className="text-xs font-monospace text-muted mb-1">Actual Revenue</div>
                                                        <div className="display-5 fw-500">$59,482</div>
                                                    </div>
                                                    <div className="mb-4 text-center text-md-start">
                                                        <div className="text-xs font-monospace text-muted mb-1">Revenue Target</div>
                                                        <div className="display-5 fw-500">$50,000</div>
                                                    </div>
                                                    <div className="mb-4 text-center text-md-start">
                                                        <div className="text-xs font-monospace text-muted mb-1">Goal</div>
                                                        <div className="display-5 fw-500 text-success">119%</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-xxl-10"><canvas id="dashboardBarChart"></canvas></div>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-transparent position-relative ripple-gray">
                                        <a className="d-flex align-items-center justify-content-end text-decoration-none stretched-link text-primary" href="#!">
                                            <div className="fst-button">Open Report</div>
                                            <i className="material-icons icon-sm ms-1">chevron_right</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-4 mb-5">
                                <div className="card card-raised h-100">
                                    <div className="card-header bg-primary text-white px-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="me-4">
                                                <h2 className="card-title text-white mb-0">Segments</h2>
                                                <div className="card-subtitle">Revenue sources</div>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-lg btn-text-light btn-icon me-n2 dropdown-toggle" id="segmentsDropdownButton" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></button>
                                                <ul className="dropdown-menu" aria-labelledby="segmentsDropdownButton">
                                                    <li><a className="dropdown-item" href="#!">Action</a></li>
                                                    <li><a className="dropdown-item" href="#!">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#!">Something else here</a></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><a className="dropdown-item" href="#!">Separated link</a></li>
                                                    <li><a className="dropdown-item" href="#!">Separated link</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                                            <div className="w-100" style={{ maxWidth: '20rem' }}><canvas id="myPieChart"></canvas></div>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-transparent position-relative ripple-gray">
                                        <a className="d-flex align-items-center justify-content-end text-decoration-none stretched-link text-primary" href="#!">
                                            <div className="fst-button">Open Report</div>
                                            <i className="material-icons icon-sm ms-1">chevron_right</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="card card-raised">
                            <div className="card-header bg-primary text-white px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-4">
                                        <h2 className="card-title text-white mb-0">Sales</h2>
                                        <div className="card-subtitle">Details and history</div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-lg btn-text-white btn-icon" type="button"><i className="material-icons">download</i></button>
                                        <button className="btn btn-lg btn-text-white btn-icon" type="button"><i className="material-icons">print</i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-4">
                               
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Ext.</th>
                                            <th>City</th>
                                            <th data-type="date" data-format="YYYY/MM/DD">Start Date</th>
                                            <th>Completion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Unity Pugh</td>
                                            <td>9958</td>
                                            <td>Curicó</td>
                                            <td>2005/02/11</td>
                                            <td>37%</td>
                                        </tr>
                                        <tr>
                                            <td>Theodore Duran</td>
                                            <td>8971</td>
                                            <td>Dhanbad</td>
                                            <td>1999/04/07</td>
                                            <td>97%</td>
                                        </tr>
                                        <tr>
                                            <td>Kylie Bishop</td>
                                            <td>3147</td>
                                            <td>Norman</td>
                                            <td>2005/09/08</td>
                                            <td>63%</td>
                                        </tr>
                                        <tr>
                                            <td>Willow Gilliam</td>
                                            <td>3497</td>
                                            <td>Amqui</td>
                                            <td>2009/29/11</td>
                                            <td>30%</td>
                                        </tr>
                                        <tr>
                                            <td>Blossom Dickerson</td>
                                            <td>5018</td>
                                            <td>Kempten</td>
                                            <td>2006/11/09</td>
                                            <td>17%</td>
                                        </tr>
                                        <tr>
                                            <td>Elliott Snyder</td>
                                            <td>3925</td>
                                            <td>Enines</td>
                                            <td>2006/03/08</td>
                                            <td>57%</td>
                                        </tr>
                                        <tr>
                                            <td>Castor Pugh</td>
                                            <td>9488</td>
                                            <td>Neath</td>
                                            <td>2014/23/12</td>
                                            <td>93%</td>
                                        </tr>
                                        <tr>
                                            <td>Pearl Carlson</td>
                                            <td>6231</td>
                                            <td>Cobourg</td>
                                            <td>2014/31/08</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr>
                                            <td>Deirdre Bridges</td>
                                            <td>1579</td>
                                            <td>Eberswalde-Finow</td>
                                            <td>2014/26/08</td>
                                            <td>44%</td>
                                        </tr>
                                        <tr>
                                            <td>Daniel Baldwin</td>
                                            <td>6095</td>
                                            <td>Moircy</td>
                                            <td>2000/11/01</td>
                                            <td>33%</td>
                                        </tr>
                                        <tr>
                                            <td>Phelan Kane</td>
                                            <td>9519</td>
                                            <td>Germersheim</td>
                                            <td>1999/16/04</td>
                                            <td>77%</td>
                                        </tr>
                                        <tr>
                                            <td>Quentin Salas</td>
                                            <td>1339</td>
                                            <td>Los Andes</td>
                                            <td>2011/26/01</td>
                                            <td>49%</td>
                                        </tr>
                                        <tr>
                                            <td>Armand Suarez</td>
                                            <td>6583</td>
                                            <td>Funtua</td>
                                            <td>1999/06/11</td>
                                            <td>9%</td>
                                        </tr>
                                        <tr>
                                            <td>Gretchen Rogers</td>
                                            <td>5393</td>
                                            <td>Moxhe</td>
                                            <td>1998/26/10</td>
                                            <td>24%</td>
                                        </tr>
                                        <tr>
                                            <td>Harding Thompson</td>
                                            <td>2824</td>
                                            <td>Abeokuta</td>
                                            <td>2008/06/08</td>
                                            <td>10%</td>
                                        </tr>
                                        <tr>
                                            <td>Mira Rocha</td>
                                            <td>4393</td>
                                            <td>Port Harcourt</td>
                                            <td>2002/04/10</td>
                                            <td>14%</td>
                                        </tr>
                                        <tr>
                                            <td>Drew Phillips</td>
                                            <td>2931</td>
                                            <td>Goes</td>
                                            <td>2011/18/10</td>
                                            <td>58%</td>
                                        </tr>
                                        <tr>
                                            <td>Emerald Warner</td>
                                            <td>6205</td>
                                            <td>Chiavari</td>
                                            <td>2002/08/04</td>
                                            <td>58%</td>
                                        </tr>
                                        <tr>
                                            <td>Colin Burch</td>
                                            <td>7457</td>
                                            <td>Anamur</td>
                                            <td>2004/02/01</td>
                                            <td>34%</td>
                                        </tr>
                                        <tr>
                                            <td>Russell Haynes</td>
                                            <td>8916</td>
                                            <td>Frascati</td>
                                            <td>2015/28/04</td>
                                            <td>18%</td>
                                        </tr>
                                        <tr>
                                            <td>Brennan Brooks</td>
                                            <td>9011</td>
                                            <td>Olmué</td>
                                            <td>2000/18/04</td>
                                            <td>2%</td>
                                        </tr>
                                        <tr>
                                            <td>Kane Anthony</td>
                                            <td>8075</td>
                                            <td>LaSalle</td>
                                            <td>2006/21/05</td>
                                            <td>93%</td>
                                        </tr>
                                        <tr>
                                            <td>Scarlett Hurst</td>
                                            <td>1019</td>
                                            <td>Brampton</td>
                                            <td>2015/07/01</td>
                                            <td>94%</td>
                                        </tr>
                                        <tr>
                                            <td>James Scott</td>
                                            <td>3008</td>
                                            <td>Meux</td>
                                            <td>2007/30/05</td>
                                            <td>55%</td>
                                        </tr>
                                        <tr>
                                            <td>Desiree Ferguson</td>
                                            <td>9054</td>
                                            <td>Gojra</td>
                                            <td>2009/15/02</td>
                                            <td>81%</td>
                                        </tr>
                                        <tr>
                                            <td>Elaine Bishop</td>
                                            <td>9160</td>
                                            <td>Petrópolis</td>
                                            <td>2008/23/12</td>
                                            <td>48%</td>
                                        </tr>
                                        <tr>
                                            <td>Hilda Nelson</td>
                                            <td>6307</td>
                                            <td>Posina</td>
                                            <td>2004/23/05</td>
                                            <td>76%</td>
                                        </tr>
                                        <tr>
                                            <td>Evangeline Beasley</td>
                                            <td>3820</td>
                                            <td>Caplan</td>
                                            <td>2009/12/03</td>
                                            <td>62%</td>
                                        </tr>
                                        <tr>
                                            <td>Wyatt Riley</td>
                                            <td>5694</td>
                                            <td>Cavaion Veronese</td>
                                            <td>2012/19/02</td>
                                            <td>67%</td>
                                        </tr>
                                        <tr>
                                            <td>Wyatt Mccarthy</td>
                                            <td>3547</td>
                                            <td>Patan</td>
                                            <td>2014/23/06</td>
                                            <td>9%</td>
                                        </tr>
                                        <tr>
                                            <td>Cairo Rice</td>
                                            <td>6273</td>
                                            <td>Ostra Vetere</td>
                                            <td>2016/27/02</td>
                                            <td>13%</td>
                                        </tr>
                                        <tr>
                                            <td>Sylvia Peters</td>
                                            <td>6829</td>
                                            <td>Arrah</td>
                                            <td>2015/03/02</td>
                                            <td>13%</td>
                                        </tr>
                                        <tr>
                                            <td>Kasper Craig</td>
                                            <td>5515</td>
                                            <td>Firenze</td>
                                            <td>2015/26/04</td>
                                            <td>56%</td>
                                        </tr>
                                        <tr>
                                            <td>Leigh Ruiz</td>
                                            <td>5112</td>
                                            <td>Lac Ste. Anne</td>
                                            <td>2001/09/02</td>
                                            <td>28%</td>
                                        </tr>
                                        <tr>
                                            <td>Athena Aguirre</td>
                                            <td>5741</td>
                                            <td>Romeral</td>
                                            <td>2010/24/03</td>
                                            <td>15%</td>
                                        </tr>
                                        <tr>
                                            <td>Riley Nunez</td>
                                            <td>5533</td>
                                            <td>Sart-Eustache</td>
                                            <td>2003/26/02</td>
                                            <td>30%</td>
                                        </tr>
                                        <tr>
                                            <td>Lois Talley</td>
                                            <td>9393</td>
                                            <td>Dorchester</td>
                                            <td>2014/05/01</td>
                                            <td>51%</td>
                                        </tr>
                                        <tr>
                                            <td>Hop Bass</td>
                                            <td>1024</td>
                                            <td>Westerlo</td>
                                            <td>2012/25/09</td>
                                            <td>85%</td>
                                        </tr>
                                        <tr>
                                            <td>Kalia Diaz</td>
                                            <td>9184</td>
                                            <td>Ichalkaranji</td>
                                            <td>2013/26/06</td>
                                            <td>92%</td>
                                        </tr>
                                        <tr>
                                            <td>Maia Pate</td>
                                            <td>6682</td>
                                            <td>Louvain-la-Neuve</td>
                                            <td>2011/23/04</td>
                                            <td>50%</td>
                                        </tr>
                                        <tr>
                                            <td>Macaulay Pruitt</td>
                                            <td>4457</td>
                                            <td>Fraser-Fort George</td>
                                            <td>2015/03/08</td>
                                            <td>92%</td>
                                        </tr>
                                        <tr>
                                            <td>Danielle Oconnor</td>
                                            <td>9464</td>
                                            <td>Neuwied</td>
                                            <td>2001/05/10</td>
                                            <td>17%</td>
                                        </tr>
                                        <tr>
                                            <td>Kato Carr</td>
                                            <td>4842</td>
                                            <td>Faridabad</td>
                                            <td>2012/11/05</td>
                                            <td>96%</td>
                                        </tr>
                                        <tr>
                                            <td>Malachi Mejia</td>
                                            <td>7133</td>
                                            <td>Vorst</td>
                                            <td>2007/25/04</td>
                                            <td>26%</td>
                                        </tr>
                                        <tr>
                                            <td>Dominic Carver</td>
                                            <td>3476</td>
                                            <td>Pointe-aux-Trembles</td>
                                            <td>2014/14/03</td>
                                            <td>71%</td>
                                        </tr>
                                        <tr>
                                            <td>Paki Santos</td>
                                            <td>4424</td>
                                            <td>Cache Creek</td>
                                            <td>2001/18/11</td>
                                            <td>82%</td>
                                        </tr>
                                        <tr>
                                            <td>Ross Hodges</td>
                                            <td>1862</td>
                                            <td>Trazegnies</td>
                                            <td>2010/19/09</td>
                                            <td>87%</td>
                                        </tr>
                                        <tr>
                                            <td>Hilda Whitley</td>
                                            <td>3514</td>
                                            <td>New Sarepta</td>
                                            <td>2011/05/07</td>
                                            <td>94%</td>
                                        </tr>
                                        <tr>
                                            <td>Roth Cherry</td>
                                            <td>4006</td>
                                            <td>Flin Flon</td>
                                            <td>2008/02/09</td>
                                            <td>8%</td>
                                        </tr>
                                        <tr>
                                            <td>Lareina Jones</td>
                                            <td>8642</td>
                                            <td>East Linton</td>
                                            <td>2009/07/08</td>
                                            <td>21%</td>
                                        </tr>
                                        <tr>
                                            <td>Joshua Weiss</td>
                                            <td>2289</td>
                                            <td>Saint-L�onard</td>
                                            <td>2010/15/01</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr>
                                            <td>Kiona Lowery</td>
                                            <td>5952</td>
                                            <td>Inuvik</td>
                                            <td>2002/17/12</td>
                                            <td>72%</td>
                                        </tr>
                                        <tr>
                                            <td>Nina Rush</td>
                                            <td>7567</td>
                                            <td>Bo‘lhe</td>
                                            <td>2008/27/01</td>
                                            <td>6%</td>
                                        </tr>
                                        <tr>
                                            <td>Palmer Parker</td>
                                            <td>2000</td>
                                            <td>Stade</td>
                                            <td>2012/24/07</td>
                                            <td>58%</td>
                                        </tr>
                                        <tr>
                                            <td>Vielka Olsen</td>
                                            <td>3745</td>
                                            <td>Vrasene</td>
                                            <td>2016/08/01</td>
                                            <td>70%</td>
                                        </tr>
                                        <tr>
                                            <td>Meghan Cunningham</td>
                                            <td>8604</td>
                                            <td>Söke</td>
                                            <td>2007/16/02</td>
                                            <td>59%</td>
                                        </tr>
                                        <tr>
                                            <td>Iola Shaw</td>
                                            <td>6447</td>
                                            <td>Albany</td>
                                            <td>2014/05/03</td>
                                            <td>88%</td>
                                        </tr>
                                        <tr>
                                            <td>Imelda Cole</td>
                                            <td>4564</td>
                                            <td>Haasdonk</td>
                                            <td>2007/16/11</td>
                                            <td>79%</td>
                                        </tr>
                                        <tr>
                                            <td>Jerry Beach</td>
                                            <td>6801</td>
                                            <td>Gattatico</td>
                                            <td>1999/07/07</td>
                                            <td>36%</td>
                                        </tr>
                                        <tr>
                                            <td>Garrett Rocha</td>
                                            <td>3938</td>
                                            <td>Gavorrano</td>
                                            <td>2000/06/08</td>
                                            <td>71%</td>
                                        </tr>
                                        <tr>
                                            <td>Derek Kerr</td>
                                            <td>1724</td>
                                            <td>Gualdo Cattaneo</td>
                                            <td>2014/21/01</td>
                                            <td>89%</td>
                                        </tr>
                                        <tr>
                                            <td>Shad Hudson</td>
                                            <td>5944</td>
                                            <td>Salamanca</td>
                                            <td>2014/10/12</td>
                                            <td>98%</td>
                                        </tr>
                                        <tr>
                                            <td>Daryl Ayers</td>
                                            <td>8276</td>
                                            <td>Barchi</td>
                                            <td>2012/12/11</td>
                                            <td>88%</td>
                                        </tr>
                                        <tr>
                                            <td>Caleb Livingston</td>
                                            <td>3094</td>
                                            <td>Fatehpur</td>
                                            <td>2014/13/02</td>
                                            <td>8%</td>
                                        </tr>
                                        <tr>
                                            <td>Sydney Meyer</td>
                                            <td>4576</td>
                                            <td>Neubrandenburg</td>
                                            <td>2015/06/02</td>
                                            <td>22%</td>
                                        </tr>
                                        <tr>
                                            <td>Lani Lawrence</td>
                                            <td>8501</td>
                                            <td>Turnhout</td>
                                            <td>2008/07/05</td>
                                            <td>16%</td>
                                        </tr>
                                        <tr>
                                            <td>Allegra Shepherd</td>
                                            <td>2576</td>
                                            <td>Meeuwen-Gruitrode</td>
                                            <td>2004/19/04</td>
                                            <td>41%</td>
                                        </tr>
                                        <tr>
                                            <td>Fallon Reyes</td>
                                            <td>3178</td>
                                            <td>Monceau-sur-Sambre</td>
                                            <td>2005/15/02</td>
                                            <td>16%</td>
                                        </tr>
                                        <tr>
                                            <td>Karen Whitley</td>
                                            <td>4357</td>
                                            <td>Sluis</td>
                                            <td>2003/02/05</td>
                                            <td>23%</td>
                                        </tr>
                                        <tr>
                                            <td>Stewart Stephenson</td>
                                            <td>5350</td>
                                            <td>Villa Faraldi</td>
                                            <td>2003/05/07</td>
                                            <td>65%</td>
                                        </tr>
                                        <tr>
                                            <td>Ursula Reynolds</td>
                                            <td>7544</td>
                                            <td>Southampton</td>
                                            <td>1999/16/12</td>
                                            <td>61%</td>
                                        </tr>
                                        <tr>
                                            <td>Adrienne Winters</td>
                                            <td>4425</td>
                                            <td>Laguna Blanca</td>
                                            <td>2014/15/09</td>
                                            <td>24%</td>
                                        </tr>
                                        <tr>
                                            <td>Francesca Brock</td>
                                            <td>1337</td>
                                            <td>Oban</td>
                                            <td>2000/12/06</td>
                                            <td>90%</td>
                                        </tr>
                                        <tr>
                                            <td>Ursa Davenport</td>
                                            <td>7629</td>
                                            <td>New Plymouth</td>
                                            <td>2013/27/06</td>
                                            <td>37%</td>
                                        </tr>
                                        <tr>
                                            <td>Mark Brock</td>
                                            <td>3310</td>
                                            <td>Veenendaal</td>
                                            <td>2006/08/09</td>
                                            <td>41%</td>
                                        </tr>
                                        <tr>
                                            <td>Dale Rush</td>
                                            <td>5050</td>
                                            <td>Chicoutimi</td>
                                            <td>2000/27/03</td>
                                            <td>2%</td>
                                        </tr>
                                        <tr>
                                            <td>Shellie Murphy</td>
                                            <td>3845</td>
                                            <td>Marlborough</td>
                                            <td>2013/13/11</td>
                                            <td>72%</td>
                                        </tr>
                                        <tr>
                                            <td>Porter Nicholson</td>
                                            <td>4539</td>
                                            <td>Bismil</td>
                                            <td>2012/22/10</td>
                                            <td>23%</td>
                                        </tr>
                                        <tr>
                                            <td>Oliver Huber</td>
                                            <td>1265</td>
                                            <td>Hannche</td>
                                            <td>2002/11/01</td>
                                            <td>94%</td>
                                        </tr>
                                        <tr>
                                            <td>Calista Maynard</td>
                                            <td>3315</td>
                                            <td>Pozzuolo del Friuli</td>
                                            <td>2006/23/03</td>
                                            <td>5%</td>
                                        </tr>
                                        <tr>
                                            <td>Lois Vargas</td>
                                            <td>6825</td>
                                            <td>Cumberland</td>
                                            <td>1999/25/04</td>
                                            <td>50%</td>
                                        </tr>
                                        <tr>
                                            <td>Hermione Dickson</td>
                                            <td>2785</td>
                                            <td>Woodstock</td>
                                            <td>2001/22/03</td>
                                            <td>2%</td>
                                        </tr>
                                        <tr>
                                            <td>Dalton Jennings</td>
                                            <td>5416</td>
                                            <td>Dudzele</td>
                                            <td>2015/09/02</td>
                                            <td>74%</td>
                                        </tr>
                                        <tr>
                                            <td>Cathleen Kramer</td>
                                            <td>3380</td>
                                            <td>Crowsnest Pass</td>
                                            <td>2012/27/07</td>
                                            <td>53%</td>
                                        </tr>
                                        <tr>
                                            <td>Zachery Morgan</td>
                                            <td>6730</td>
                                            <td>Collines-de-l'Outaouais</td>
                                            <td>2006/04/09</td>
                                            <td>51%</td>
                                        </tr>
                                        <tr>
                                            <td>Yoko Freeman</td>
                                            <td>4077</td>
                                            <td>Lidköping</td>
                                            <td>2002/27/12</td>
                                            <td>48%</td>
                                        </tr>
                                        <tr>
                                            <td>Chaim Waller</td>
                                            <td>4240</td>
                                            <td>North Shore</td>
                                            <td>2010/25/07</td>
                                            <td>25%</td>
                                        </tr>
                                        <tr>
                                            <td>Berk Johnston</td>
                                            <td>4532</td>
                                            <td>Vergnies</td>
                                            <td>2016/23/02</td>
                                            <td>93%</td>
                                        </tr>
                                        <tr>
                                            <td>Tad Munoz</td>
                                            <td>2902</td>
                                            <td>Saint-Nazaire</td>
                                            <td>2010/09/05</td>
                                            <td>65%</td>
                                        </tr>
                                        <tr>
                                            <td>Vivien Dominguez</td>
                                            <td>5653</td>
                                            <td>Bargagli</td>
                                            <td>2001/09/01</td>
                                            <td>86%</td>
                                        </tr>
                                        <tr>
                                            <td>Carissa Lara</td>
                                            <td>3241</td>
                                            <td>Sherborne</td>
                                            <td>2015/07/12</td>
                                            <td>72%</td>
                                        </tr>
                                        <tr>
                                            <td>Hammett Gordon</td>
                                            <td>8101</td>
                                            <td>Wah</td>
                                            <td>1998/06/09</td>
                                            <td>20%</td>
                                        </tr>
                                        <tr>
                                            <td>Walker Nixon</td>
                                            <td>6901</td>
                                            <td>Metz</td>
                                            <td>2011/12/11</td>
                                            <td>41%</td>
                                        </tr>
                                        <tr>
                                            <td>Nathan Espinoza</td>
                                            <td>5956</td>
                                            <td>Strathcona County</td>
                                            <td>2002/25/01</td>
                                            <td>47%</td>
                                        </tr>
                                        <tr>
                                            <td>Kelly Cameron</td>
                                            <td>4836</td>
                                            <td>Fontaine-Valmont</td>
                                            <td>1999/02/07</td>
                                            <td>24%</td>
                                        </tr>
                                        <tr>
                                            <td>Kyra Moses</td>
                                            <td>3796</td>
                                            <td>Quenast</td>
                                            <td>1998/07/07</td>
                                            <td>68%</td>
                                        </tr>
                                        <tr>
                                            <td>Grace Bishop</td>
                                            <td>8340</td>
                                            <td>Rodez</td>
                                            <td>2012/02/10</td>
                                            <td>4%</td>
                                        </tr>
                                        <tr>
                                            <td>Haviva Hernandez</td>
                                            <td>8136</td>
                                            <td>Suwałki</td>
                                            <td>2000/30/01</td>
                                            <td>16%</td>
                                        </tr>
                                        <tr>
                                            <td>Alisa Horn</td>
                                            <td>9853</td>
                                            <td>Ucluelet</td>
                                            <td>2007/01/11</td>
                                            <td>39%</td>
                                        </tr>
                                        <tr>
                                            <td>Zelenia Roman</td>
                                            <td>7516</td>
                                            <td>Redwater</td>
                                            <td>2012/03/03</td>
                                            <td>31%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
                
                <footer className="py-4 mt-auto border-top" style={{ minHeight: '74px' }}>
                    <div className="container-xl px-5">
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between small">
                            <div className="me-sm-2">Copyright &copy; RK Energies 2024</div>
                            <div className="d-flex ms-sm-2">
                                <a className="text-decoration-none" href="#!">Privacy Policy</a>
                                <div className="mx-1">&middot;</div>
                                <a className="text-decoration-none" href="#!">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
                </div>
            </div>
            
    );
};

export default Dashboard;
