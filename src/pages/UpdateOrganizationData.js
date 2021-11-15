import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import UpdateOrganizationDataForm from "../components/UpdateOrganizationDataForm";

const UpdateOrganizationData = () => {
  const [organization, setOrganization] = useState();

  const userFromAPI = () => {
    return axios({
      method: "get",

      url: `${process.env.REACT_APP_URL}/organization`,
    }).then(function (response) {
      setOrganization(response.data.data);
    });
  };

  useEffect(() => {
    userFromAPI();
  }, []);

  const organizationUpdateData = (values) => {
    return axios({
      method: "post",
      //update post url. it was not in the ticket
      url: `${process.env.REACT_APP_URL}/`,

      data: values,
    });
  };

  return (
    <UpdateOrganizationDataForm
      onSubmit={organizationUpdateData}
      initialValues={organization}
    />
  );
};
export default UpdateOrganizationData;
