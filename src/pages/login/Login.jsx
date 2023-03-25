import "./login.css";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message.message || message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, navigate, dispatch, isLoading, isError]);

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      return toast.error("Vui lòng nhập đúng email!");
    }
    if (password.length < 8) {
      return toast.error("Mật khẩu phải từ 8 ký tự trở lên!");
    }
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div className="login">
      <section className="header">
        <h1>
          <FaSignInAlt className="icon-header" /> Đăng nhập
        </h1>
        <p>Đăng nhập và kết nối với mọi người</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Nhập Email của bạn"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Nhập mật khẩu tài khoản của bạn"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Đăng nhập
            </button>
          </div>
        </form>
        <div className="to-register">
          <Link to={"/register"}>Đăng ký nếu bạn chưa có tài khoản</Link>
        </div>
        <div className="to-register">
          <Link to={"/forgot-password"}>Quên mật khẩu</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
