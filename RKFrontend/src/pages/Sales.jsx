import React from 'react';

const Sales = () => {
    return (
        <div className="container-xl p-5">
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
                            {/* Add the rest of the rows similarly */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Sales;