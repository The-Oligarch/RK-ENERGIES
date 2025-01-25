import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundIcon from '../assets/img/icons/background.svg';
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      rememberPassword,
    };

    try {
      const response = await fetch('https://rk-energies-u9cj.onrender.com/backendapi/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="bg-pattern-waihou" id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xxl-8 col-xl-8 col-lg-12">
                  <div className="card card-raised shadow-10 mt-1 mt-xl-3 mb-1">
                    <div className="row g-0">
                      <div className="col-lg-5 col-md-6">
                        <div className="card-body p-5">
                          <div className="text-center">
                            <img
                              className="mb-3"
                              src={backgroundIcon}
                              alt="..."
                              style={{ height: '48px' }}
                            />
                            <h1 className="display-5 mb-0">Login</h1>
                            <div className="subheading-1 mb-5">to continue to app</div>
                          </div>
                          {error && <div className="alert alert-danger">{error}</div>}
                          <form className="mb-5" onSubmit={handleLogin}>
                            <div className="mb-4">
                              <mwc-textfield
                                className="w-100"
                                label="Username"
                                outlined
                                value={username}
                                onInput={(e) => setUsername(e.target.value)}
                              ></mwc-textfield>
                            </div>
                            <div className="mb-4">
                              <mwc-textfield
                                className="w-100"
                                label="Password"
                                outlined
                                icontrailing="visibility_off"
                                type="password"
                                value={password}
                                onInput={(e) => setPassword(e.target.value)}
                              ></mwc-textfield>
                            </div>
                            <div className="d-flex align-items-center">
                              <mwc-formfield label="Remember password">
                                <mwc-checkbox
                                  checked={rememberPassword}
                                  onChange={(e) => setRememberPassword(e.target.checked)}
                                ></mwc-checkbox>
                              </mwc-formfield>
                            </div>
                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                              <a className="small fw-500 text-decoration-none" href="app-auth-password-basic.html">Forgot Password?</a>
                              <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                          </form>
                          <div className="text-center">
                            <a className="small fw-500 text-decoration-none" href="/register">New User? Create an account!</a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-7 col-md-6 d-none d-md-block"
                        style={{
                          backgroundImage: "url('/logo1.jpeg')",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer"></div>
      </div>
    </div>
  );
};

export default Login;