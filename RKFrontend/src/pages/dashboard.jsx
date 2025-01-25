import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import Sales from "./Sales";
import FuelManagement from "./FuelManagement";
import UserManagement from "./UserManagement";
import backgroundIcon from '../assets/img/icons/background.svg';
import "../App.css";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const username = localStorage.getItem('username') || 'RK energies admin';

    return (
        <div className={`layout ${isDarkMode ? 'dark-mode' : ''}`}>
            <nav className="top-app-bar navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid px-4">
                    <button className="btn btn-lg btn-icon order-1 order-lg-0" id="drawerToggle" onClick={toggleDrawer}><i className="material-icons">menu</i></button>
                    <a className="navbar-brand me-auto" href="/"><div className="text-uppercase font-monospace">RK ENERGIES</div></a>
                    <div className="d-flex align-items-center mx-3 me-lg-0">
                        <div className="d-flex">
                            <button className="btn btn-lg btn-icon me-3" onClick={toggleDarkMode}><i className="material-icons">brightness_4</i></button>
                            <div className="dropdown">
                                <button className="btn btn-lg btn-icon dropdown-toggle" id="dropdownMenuProfile" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">person</i></button>
                                <ul className="dropdown-menu dropdown-menu-end mt-3" aria-labelledby="dropdownMenuProfile">
                                    <li><a className="dropdown-item" href="/">Profile</a></li>
                                    <li><a className="dropdown-item" href="/">Settings</a></li>
                                    <li><a className="dropdown-item" href="/">Help</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="main-layout">
                {isDrawerOpen && (
                    <div className="drawer">
                        <nav className="drawer-menu">
                            <div className="drawer-menu-divider d-sm-none"></div>
                            <div className="drawer-menu-heading">Interface</div>
                            <Link className="nav-link d-flex" to="/dashboard">
                                <div className="nav-link-icon me-4"><i className="material-icons">dashboard</i></div>
                                Dashboard
                            </Link>
                            <Link className="nav-link d-flex" to="/dashboard/sales">
                                <div className="nav-link-icon me-4"><i className="material-icons">storefront</i></div>
                                Sales
                            </Link>
                            <Link className="nav-link d-flex" to="/dashboard/fuel-management">
                                <div className="nav-link-icon me-4"><i className="material-icons">local_gas_station</i></div>
                                Fuel Management
                            </Link>
                            {username === 'walt' && (
                                <Link className="nav-link d-flex" to="/dashboard/user-management">
                                    <div className="nav-link-icon me-4"><i className="material-icons">people</i></div>
                                    User Management
                                </Link>
                            )}
                        </nav>
                        <div className="drawer-footer border-top">
                            <div className="d-flex align-items-center">
                                <i className="material-icons text-muted">account_circle</i>
                                <div className="ms-3">
                                    <div className="caption">Logged in as:</div>
                                    <div className="small fw-500">{username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="content">
                    <Routes>
                        <Route path="/" element={<DashboardContent />} />
                        <Route path="sales" element={<Sales />} />
                        <Route path="fuel-management" element={<FuelManagement />} />
                        {username === 'walt' && <Route path="user-management" element={<UserManagement />} />}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;