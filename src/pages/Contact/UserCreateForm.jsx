import axios from "axios";
import UserForm from "../../components/UserForm/UserForm";

const UserCreateForm = () => {
  const handleOnPostNewUser = (values) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/users`,
      data: values,
    });
  };

  return <UserForm onSubmit={handleOnPostNewUser} titleForm="Crear usuario" />;
};
export default UserCreateForm;
