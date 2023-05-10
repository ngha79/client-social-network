import "./register.css";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Nam",
    dateOfBirth: "2000-01-01",
  });
  const [avatarUser, setAvatarUser] = useState(null);

  const { name, email, password, gender, dateOfBirth } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Tạo tài khoản thành công");
      navigate("/login");
    }
    if (user) {
      navigate("/");
    }
    dispatch(reset());
  }, [navigate, dispatch, isLoading, isSuccess, isError]);

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadAvatar = (e) => {
    setAvatarUser(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const avatar = avatarUser;
    const userData = {
      name,
      email,
      password,
      gender,
      dateOfBirth,
      avatar,
    };
    dispatch(register(userData));
  };

  return (
    <div className="register">
      <section className="header">
        <h1>
          <FaSignInAlt className="icon-header" /> Đăng ký
        </h1>
        <p>Đăng ký và kết nối với mọi người</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Nhập tên của bạn"
            />
          </div>
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
            <input
              type="file"
              className="form-control"
              id="avatar"
              name="avatar"
              onChange={uploadAvatar}
            />
          </div>
          <div className="form-group">
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={"Nam"}
              name="gender"
              id="gender"
              onChange={onChange}
            >
              <option value="Select" disabled>
                Giới tính
              </option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Đăng ký
            </button>
          </div>
        </form>
        <Link to={"/login"} className="to-login">
          Đăng nhập nếu bạn đã có tài khoản
        </Link>
      </section>
    </div>
  );
};

export default Register;
