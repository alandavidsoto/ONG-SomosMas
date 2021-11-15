import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserForm from "../../components/UserForm/UserForm";

const UserEditForm = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  const userFromAPI = (id) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/users/${id}`,
    }).then(function (response) {
      setUser(response.data.data);
    });
  };

  useEffect(() => {
    userFromAPI(id);
  }, [id]);

  const handleOnEditUser = (values) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/users/${id}`,
      data: values,
    });
  };
  return (
    <UserForm
      onSubmit={handleOnEditUser}
      titleForm="Editar usuario"
      initialValues={user}
    />
  );
};
export default UserEditForm;
