import React from "react";
import Header from "../../components/PublicHeader";
import Footer from "../../components/PublicFooter";
import BackofficeHeader from "../BackofficeHeader/index";
import BackofficeSidebarMenu from "../BackOfficeSidebarMenu";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router";
import "../../assets/structure.scss";
import "../../pages/Home/IndexHome.scss";
import ShapeDecor from "../ShapeDecor";
const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = (e) => {
    setOpen(true);
  };

  const handleDrawerClose = (e) => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  const admin = pathname.includes("/backoffice");
  const getColor = () => {
    const number = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    if (number === 3) return "primary";
    if (number === 2) return "secondary";
    if (number === 1) return "third";
  };
  return (
    <>
      {admin ? (
        <>
          <BackofficeHeader handleDrawerOpen={handleDrawerOpen} open={open} />
          <BackofficeSidebarMenu
            handleDrawerClose={handleDrawerClose}
            open={open}
          />
          <div
            style={{ padding: "20px", minHeight: "calc(100vh - 70px - 200px)" }}
          >
            {children}
          </div>
        </>
      ) : (
        <>
          <Header />
          <Box position="relative" overflow="hidden">
            <ShapeDecor
              color={getColor()}
              width="200px"
              right={Math.floor(Math.random() * (150 - 50 + 1) + 50)}
              top={Math.floor(Math.random() * (50 + 50 + 1) - 50)}
            />
            <ShapeDecor
              variant="triangle"
              color={getColor()}
              width="200px"
              rotation={Math.random() * 100}
              top="50%"
              left={Math.floor(Math.random() * (150 - 50 + 1) + 50)}
            />
            <ShapeDecor
              variant="rectangle"
              color={getColor()}
              width="150px"
              rotation={Math.random() * 100}
              top={Math.floor(Math.random() * (90 - 30 + 1) + 30)}
              left={Math.floor(Math.random() * (60 - 20 + 1) + 20)}
            />
            <ShapeDecor
              color={getColor()}
              width="250px"
              rotation={Math.random() * 100}
              bottom={Math.floor(Math.random() * (90 - 30 + 1) + 30)}
              left={Math.floor(Math.random() * (-80 + 20 + 1) - 20)}
            />
            <ShapeDecor
              color={getColor()}
              variant="triangle"
              width="250px"
              rotation={Math.random() * 100}
              bottom={Math.floor(Math.random() * (60 - 20 + 1) + 20)}
              right={-60}
            />
            <ShapeDecor
              color={getColor()}
              variant="rectangle"
              width="220px"
              rotation={Math.random() * 100}
              bottom="50%"
              right={Math.floor(Math.random() * (-80 + 20 + 1) - 20)}
            />
            <Box minHeight="80vh" width={"98%"} margin={"auto"}>
              {children}
            </Box>
          </Box>
        </>
      )}
      <Footer />
    </>
  );
};

export default Layout;
