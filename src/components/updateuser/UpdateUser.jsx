import { useDispatch, useSelector } from "react-redux";
import "./updateUser.scss";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { reset, updateUser } from "../../features/auth/authSlice";

const UpdateUser = ({ handleCancelUpdateUser }) => {
  const { user } = useSelector((state) => state.auth);
  const [avatarUser, setAvatarUser] = useState();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    dateOfBirth: new Date(user.dateOfBirth)
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-"),
  });
  const { name, email, gender, dateOfBirth } = formData;
  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const uploadAvatar = (e) => {
    setAvatarUser(e.target.files[0]);
  };

  const handleCancelUpdate = () => {
    handleCancelUpdateUser();
  };

  const handleCancelClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("gender", gender);
    form.append("dateOfBirth", dateOfBirth);
    if (avatarUser) {
      form.append("avatar", avatarUser);
    }
    dispatch(updateUser(form));
  };

  return (
    <div className="update-user" onClick={handleCancelUpdate}>
      <div className="user" onClick={handleCancelClose}>
        <header>Update profile</header>
        <AiOutlineClose
          className="close-form"
          size={32}
          onClick={handleCancelUpdate}
        />
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
              disabled
              value={email}
              onChange={onChange}
              placeholder="Nhập Email của bạn"
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
