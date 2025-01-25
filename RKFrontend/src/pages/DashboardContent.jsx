import React from 'react';

const DashboardContent = () => {
    return (
        <div id="layoutDrawer_content">
            <main>
                <div className="container-xl p-5">
                    <div className="row justify-content-between align-items-center mb-5">
                        <div className="col flex-shrink-0 mb-5 mb-md-0">
                            <h1 className="display-4 mb-0">Dashboard</h1>
                            <div className="text-muted">Sales overview & summary</div>
                        </div>
                        <div className="col-12 col-md-auto">
                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <mwc-select className="mw-50 mb-2 mb-md-0" outlined label="View by">
                                    <mwc-list-item selected value="0">Fuel Station</mwc-list-item>
                                    <mwc-list-item value="1">Petrol</mwc-list-item>
                                    <mwc-list-item value="2">Diesel</mwc-list-item>
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
                                            <div className="card-text">Transactions</div>
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
                                            <div className="card-text">Fuel Stations</div>
                                        </div>
                                        <div className="icon-circle bg-white-50 text-info"><i className="material-icons">local_gas_station</i></div>
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
                </div>
            </main>
        </div>
    );
};

export default DashboardContent;