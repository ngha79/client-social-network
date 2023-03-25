import { FaSignInAlt, FaKey } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  forgotPassword,
  reset,
  resetPassword,
} from "../../features/auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const location = useLocation();

  const token = location.pathname.split("/reset-password/");

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== repassword) {
      return toast.error("Mật khẩu không giống nhau!");
    }

    const userData = {
      password,
    };
    console.log(token[1]);

    dispatch(resetPassword({ data: userData, token: token[1] }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Đổi mật khẩu thành công.");
      navigate("/login");
    }
    dispatch(reset());
  }, [navigate, dispatch, isLoading, isError, message]);

  const onChange = (e) => {
    setPassword(e.target.value);
  };
  const onChangeRe = (e) => {
    setRePassword(e.target.value);
  };

  return (
    <div className="login">
      <section className="header">
        <h1>
          <FaKey className="icon-header" /> Đổi mật khẩu
        </h1>
      </section>
      <section className="form" onSubmit={onSubmit}>
        <form>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              onChange={onChange}
              value={password}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Nhập lại mật khẩu của bạn"
              onChange={onChangeRe}
              value={repassword}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Đổi mật khẩu
            </button>
          </div>
        </form>

        <div className="to-register">
          <Link to={"/login"}>Đăng nhập</Link>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
