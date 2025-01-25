import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundIcon2 from "../assets/img/icons/background.svg";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== verifyPassword) {
            setError('Passwords do not match');
            return;
        }

        const data = {
            firstName,
            email,
            password,
        };

        try {
            const response = await fetch('https://rk-energies-u9cj.onrender.com/backendapi/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                navigate('/');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div id="layoutAuthentication" className="bg-pattern-waihou">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-7 col-xl-10">
                                <div className="card card-raised shadow-10 mt-1 mt-xl-3 mb-1">
                                    <div className="card-body p-2">
                                        <div className="text-center">
                                            <img className="mb-3" src={backgroundIcon2} alt="..." style={{ height: "48px" }} />
                                            <h1 className="display-5 mb-0">Create New Account</h1>
                                            <div className="subheading-1 mb-5">to continue to app</div>
                                        </div>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <form onSubmit={handleRegister}>
                                            <div className="row">
                                                <div className="col-sm-6 mb-4">
                                                    <mwc-textfield className="w-100" label="First Name" outlined value={firstName} onInput={(e) => setFirstName(e.target.value)}></mwc-textfield>
                                                </div>
                                                <div className="col-sm-6 mb-4">
                                                    <mwc-textfield className="w-100" label="Last Name" outlined value={lastName} onInput={(e) => setLastName(e.target.value)}></mwc-textfield>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <mwc-textfield className="w-100" label="Email Address" outlined value={email} onInput={(e) => setEmail(e.target.value)}></mwc-textfield>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6 mb-4">
                                                    <mwc-textfield className="w-100" label="Password" outlined icontrailing="visibility_off" type="password" value={password} onInput={(e) => setPassword(e.target.value)}></mwc-textfield>
                                                </div>
                                                <div className="col-sm-6 mb-4">
                                                    <mwc-textfield className="w-100" label="Verify Password" outlined icontrailing="visibility_off" type="password" value={verifyPassword} onInput={(e) => setVerifyPassword(e.target.value)}></mwc-textfield>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <mwc-formfield label="I agree to the website terms and conditions">
                                                    <mwc-checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}></mwc-checkbox>
                                                </mwc-formfield>
                                            </div>
                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small fw-500 text-decoration-none" href="/">Sign in instead</a>
                                                <button type="submit" className="btn btn-primary">Create Account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="p-4">
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between small">
                        <div className="me-sm-3 mb-2 mb-sm-0">
                            <div className="fw-500 text-white">Copyright &copy; RK Energies 2024</div>
                        </div>
                        <div className="ms-sm-3">
                            <a className="fw-500 text-decoration-none link-white" href="#!">Privacy</a>
                            <a className="fw-500 text-decoration-none link-white mx-4" href="#!">Terms</a>
                            <a className="fw-500 text-decoration-none link-white" href="#!">Help</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Register;