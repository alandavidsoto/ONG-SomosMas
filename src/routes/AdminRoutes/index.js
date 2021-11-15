import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { PrivateRoute } from "../../components/PrivateRoute";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLoginExample } from "../../app/auth/authReducer";
import Layout from "../../components/Layout/Layout";
import { AnimatedSwitch } from "react-router-transition";

const BackofficeSlides = React.lazy(() =>
  import("../../components/BackofficeSlides/BackofficeSlides")
);
const FormSlide = React.lazy(() => import("../../components/Slide/FormSlide"));

const ListActivities = React.lazy(() =>
  import("../../components/Activities/ListActivities")
);
const BackofficeEditHome = React.lazy(() =>
  import("../../components/BackofficeEditHome/BackofficeEditHome")
);
const MembersList = React.lazy(() =>
  import("../../components/members/MembersList")
);
const FormActivity = React.lazy(() =>
  import("../../components/Activities/FormActivity/FormActivity")
);
const BackofficeCategoryVisualization = React.lazy(() =>
  import(
    "../../components/BackofficeCategoryVisualization/BackofficeCategoryVisualization"
  )
);
const CreateEditCategoryForm = React.lazy(() =>
  import("../../components/CreateEditCategoryForm/index")
);
const OngDataVizualization = React.lazy(() =>
  import("../../components/OngDataVisualization/OngDataVizualization")
);

const UpdateOrganizationDataForm = React.lazy(() =>
  import("../../components/UpdateOrganizationDataForm")
);
const BackofficeNewsList = React.lazy(() =>
  import("../../components/BackofficeNewsList")
);
const BackofficeNewsFormCreate = React.lazy(() =>
  import("../../components/CreateEditNewForm")
);
const BackofficeUsers = React.lazy(() =>
  import("../../components/BackofficeUsers/BackofficeUsers")
);
const UserForm = React.lazy(() =>
  import("../../components/UserForm/UserForm.jsx")
);
const NotFound = React.lazy(() => import("../../components/NotFound/index"));
const ScreenDashboard = React.lazy(() =>
  import("../../components/ScreenDashboard")
);

const AdminRoutes = () => {
  const [element, setElement] = useState("");
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const role =
    Boolean(JSON.parse(localStorage.getItem("dataUser"))) &&
    JSON.parse(localStorage.getItem("dataUser")).role === "admi";
  return (
    <Layout>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <PrivateRoute
          path="/backoffice/news/create"
          trueComponent={<BackofficeNewsFormCreate />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/activities/create"
          trueComponent={<FormActivity />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/activities/edit"
          trueComponent={<FormActivity activity={element} />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/categories/create"
          trueComponent={<CreateEditCategoryForm />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/categories/edit"
          trueComponent={<CreateEditCategoryForm category={element} />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/slides/create"
          trueComponent={<FormSlide />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/slides/edit"
          trueComponent={<FormSlide slide={element} />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/organization/edit"
          condition={role}
          trueComponent={<UpdateOrganizationDataForm />}
          elseRedirect="/"
        />
        <PrivateRoute
          path="/backoffice/users/create"
          condition={role}
          trueComponent={<UserForm />}
          elseRedirect="/"
        />
        <PrivateRoute path="/backoffice/members/create" trueComponent={false} />

        <PrivateRoute
          path="/backoffice/news"
          condition={role}
          trueComponent={<BackofficeNewsList />}
          elseRedirect="/"
        />
        <PrivateRoute
          path="/backoffice/users"
          condition={role}
          trueComponent={<BackofficeUsers />}
          elseRedirect="/"
        />

        <PrivateRoute
          path="/backoffice/activities"
          condition={role}
          trueComponent={<ListActivities setElement={setElement} />}
          elseRedirect="/"
        ></PrivateRoute>

        <PrivateRoute
          path="/backoffice/categories"
          condition={role}
          trueComponent={
            <BackofficeCategoryVisualization setElement={setElement} />
          }
          elseRedirect="/"
        />

        <PrivateRoute
          path="/backoffice/slides"
          trueComponent={<BackofficeSlides setElement={setElement} />}
          elseRedirect="/"
          condition={role}
        />

        <PrivateRoute
          path="/backoffice/members"
          trueComponent={<MembersList />}
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/home"
          trueComponent={
            <BackofficeEditHome
              homeContent={{
                welcomeText: "Hello World!!",
                slide1Image: "/images/404.png",
                slide1Text: "hello world",
                slide2Image: "/images/404.png",
                slide2Text: "hello world",
                slide3Image: "/images/404.png",
                slide3Text: "hello world",
              }}
            />
          }
          elseRedirect="/"
          condition={role}
        />
        <PrivateRoute
          path="/backoffice/organization"
          condition={role}
          trueComponent={<OngDataVizualization />}
          elseRedirect="/"
        />

        <PrivateRoute
          path="/backoffice"
          trueComponent={<ScreenDashboard />}
          elseRedirect="/"
          condition={role}
        />
        <Route path="*" component={NotFound} />
      </AnimatedSwitch>
    </Layout>
  );
};

export default AdminRoutes;
