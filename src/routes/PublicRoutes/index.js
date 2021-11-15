import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../../components/PrivateRoute";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { AnimatedSwitch } from "react-router-transition";
import AdminRoutes from "../AdminRoutes";

const User = React.lazy(() => import("../../pages/User"));
const ActivityDetail = React.lazy(() =>
  import("../../components/Activities/Detail")
);
const Donation = React.lazy(() =>
  import("../../components/Donations/Donation")
);
const FormRegister = React.lazy(() =>
  import("../../components/FormRegister/FormRegister")
);
const Newsletter = React.lazy(() =>
  import("../../components/Newsletter/Newsletter")
);
const DetailsNews = React.lazy(() => import("../../components/News/Details"));
const Login = React.lazy(() => import("../../components/LoginForm/LoginForm"));
const Home = React.lazy(() => import("../../pages/Home"));
const Contact = React.lazy(() => import("../../pages/Contact/Contact"));
const Nosotros = React.lazy(() => import("../../pages/Nosotros/Nosotros"));
const News = React.lazy(() => import("../../pages/News"));
const Activities = React.lazy(() => import("../../pages/Activities"));
const NotFound = React.lazy(() => import("../../components/NotFound/index"));
const UserForm = React.lazy(() => import("../../components/UserForm/UserForm"));
const index = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Layout>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <Route path="/news/:id" exact component={DetailsNews} />
          <Route path="/activities/:id" exact component={ActivityDetail} />
          <Route path="/activities" exact component={Activities} />
          <Route path="/news" exact component={News} />
          <Route path="/donar" exact component={Donation} />
          <Route path="/contacto" exact>
            <Contact
              /*mock api data*/
              contactData={{
                address: "calle 123",
                email: "somosmasong@email.com",
                phone: 12345678,
              }}
            />
          </Route>
          <PrivateRoute
            path="/user"
            condition={auth}
            trueComponent={<User />}
            elseRedirect="/login"
          />
          <PrivateRoute
            path="/login"
            condition={!auth}
            trueComponent={<Login />}
            elseRedirect="/"
          />
          <Route path="/register" exact component={FormRegister} />
          <Route path="/newsletter" exact component={Newsletter} />
          <Route path="/" component={Home} exact />
          <Route path="*" component={NotFound} />
        </AnimatedSwitch>
      </Layout>
    </>
  );
};

export default index;
