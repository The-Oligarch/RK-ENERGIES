
import backgroundIcon from '../assets/img/icons/background.svg';
import "../App.css";



const Login = () => {
  return (
    <div className="bg-pattern-waihou">
      <div id="layoutAuthentication">

        <div id="layoutAuthentication_content">

          <main>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xxl-10 col-xl-10 col-lg-12">
                  <div className="card card-raised shadow-10 mt-5 mt-xl-10 mb-4">
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

                          <form className="mb-5">
                            <div className="mb-4"><mwc-textfield className="w-100" label="Username" outlined></mwc-textfield></div>
                            <div className="mb-4"><mwc-textfield className="w-100" label="Password" outlined icontrailing="visibility_off" type="password"></mwc-textfield></div>
                            <div className="d-flex align-items-center">
                              <mwc-formfield label="Remember password"><mwc-checkbox></mwc-checkbox></mwc-formfield>
                            </div>
                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                              <a className="small fw-500 text-decoration-none" href="app-auth-password-basic.html">Forgot Password?</a>
                              <a className="btn btn-primary" href="/dashboard">Login</a>
                            </div>
                          </form>

                          <div className="text-center"><a className="small fw-500 text-decoration-none" href="/register">New User? Create an account!</a></div>
                        </div>
                      </div>

                      <div
                        className="col-lg-7 col-md-6 d-none d-md-block"
                        style={{
                          backgroundImage: "url(https://source.unsplash.com/-uHVRvDr7pg/1600x900)",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      ></div> </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <div id="layoutAuthentication_footer"></div>
      </div>
    </div>
  )
};

export default Login;
