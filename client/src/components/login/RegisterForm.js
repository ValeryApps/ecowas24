import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../../store/reducers/user";
import RegisterInput from "../inputs/registerInput";
import { PulseLoader } from "react-spinners";
import { IoClose, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const RegisterForm = ({ setVisible }) => {
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [register, setRegister] = useState(userInfo);

  const { first_name, last_name, email, password } = register;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const registerValidation = Yup.object({
    first_name: Yup.string().required("What first name is required"),
    last_name: Yup.string().required("What last name is required"),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });
  const submitRegister = () => {
    dispatch(registerUserAsync(register));
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <IoClose
            size={25}
            onClick={() => setVisible(false)}
            className="close_register"
          />
          <span>Sign Up For Free</span>
          <span>It is very quick and easy</span>
        </div>
        <Formik
          initialValues={{
            first_name,
            last_name,
            email,
            password,
          }}
          enableReinitialize
          validationSchema={registerValidation}
          onSubmit={submitRegister}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  name="first_name"
                  placeholder="User name"
                  onChange={handleRegisterChange}
                  value={first_name}
                />
                <RegisterInput
                  type="text"
                  name="last_name"
                  placeholder="User name"
                  onChange={handleRegisterChange}
                  value={last_name}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  name="email"
                  placeholder="Mobile number or Email Address"
                  onChange={handleRegisterChange}
                  value={email}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  onChange={handleRegisterChange}
                  value={password}
                />
                <div
                  className="register_password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>

              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and
                <span>Cookie Policy.</span> You may receive SMS notifications
                from un and opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button
                  type="submit"
                  className="blue_btn open_signup"
                  disabled={loading}
                >
                  {loading ? " Signing you Up" : "Sign Up"}
                  {loading && <PulseLoader color="white" />}
                </button>
              </div>

              {error && <h6 className="register_error">{error}</h6>}
            </Form>
          )}
        </Formik>
      </div>
      {/* register */}
    </div> /*blur*/
  );
};

export default RegisterForm;
