import { useState } from "react";
// import Footer from "../../components/footer/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import "./login.css";

const Login = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <LoginForm setVisible={setVisible} />
      {visible && <RegisterForm setVisible={setVisible} />}
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
