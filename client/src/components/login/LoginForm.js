import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../store/reducers/user";
import LoginInput from "../inputs/loginInput";
import { PulseLoader } from "react-spinners";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const loginInfo = {
  email: "",
  password: "",
};
const LoginForm = ({ setVisible }) => {
  const [login, setLogin] = useState(loginInfo);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { email, password } = login;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string().required("Password is required").min(6),
  });
  const submitLogin = () => {
    dispatch(loginUserAsync(login));
    navigate("/");
  };
  return (
    <div className="login_wrapper">
      <div className="login_wrap">
        <div className="login_2">
          <div className="login_2_wrap">
            <h1>Login to E24</h1>
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
              onSubmit={submitLogin}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    placeholder="Email or phone number"
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                  />
                  <LoginInput
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleInputChange}
                    // bottom
                  />
                  <div
                    className="password"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                  <button type="submit" className="blue_btn">
                    {loading ? "Logging you in" : "Log In"}
                    {loading && <PulseLoader color="white" />}
                  </button>
                </Form>
              )}
            </Formik>
            {error && <h6 className="login_error">{error}</h6>}
            <Link to="/reset" className="forgot_password">
              forgotten password?
            </Link>
            <div className="sign_splitter"></div>
            <button
              className="blue_btn open_signup"
              onClick={() => setVisible(true)}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
