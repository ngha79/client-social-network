import { FaSignInAlt, FaKey } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, reset } from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      return toast.error("Vui lòng nhập đúng email!");
    }

    const userData = {
      email,
    };

    dispatch(forgotPassword(userData));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message.message || message);
    }
    if (isSuccess) {
      toast.success("Vui lòng kiểm tra Email của bạn");
    }
    dispatch(reset());
  }, [navigate, dispatch, isLoading, isError]);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login">
      <section className="header">
        <h1>
          <FaKey className="icon-header" /> Quên mật khẩu
        </h1>
      </section>
      <section className="form" onSubmit={onSubmit}>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Nhập Email của bạn"
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Gửi đến Email
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

export default ForgotPassword;
