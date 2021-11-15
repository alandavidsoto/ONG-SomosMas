import { Button, Grid, Link, List, ListItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataOrganization from "./Data";
import {
  isBrowser,
  isDesktop,
  isMobile,
  isSmartTV,
  isTablet,
} from "react-device-detect";
import Breakpoint from "./Breakpoint.js";
import useBreakpoints from "./useBreakpoints.js";
import useMediaQuery from "./useMediaQuery.js";
import "./style.scss";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

const index = () => {
  const isActive = useMediaQuery("(max-width: 640px)");
  const { mobile, tablet, desktop, smartTV, active } = useBreakpoints();
  const [dataFooter, setDateFooter] = useState({});
  useEffect(() => {
    setDateFooter(DataOrganization);
  }, []);
  return (
    <>
      <footer className="style-footer ">
        <Grid container spacing={1}>
          <Grid item xs={smartTV || isSmartTV ? 4 : 6} className="footer-1">
            <div>
              <img src={dataFooter.logo} />
              {(tablet || isTablet) && (
                <Link href="/" className="text-name">
                  {dataFooter.name}
                </Link>
              )}
            </div>
          </Grid>
          <Grid item xs={smartTV || isSmartTV ? 4 : 6} className="footer-1">
            <List component="nav" aria-label="contacts">
              <ListItem>
                <Link href={dataFooter.facebook_url} className="flex-container">
                  <FacebookIcon />
                  {(desktop || isDesktop) && <span>Facebook</span>}
                </Link>
              </ListItem>
              <ListItem>
                <Link href={dataFooter.linkedin_url} className="flex-container">
                  <LinkedInIcon />
                  {(desktop || isDesktop) && <span>LinkedIn</span>}
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href={dataFooter.instagram_url}
                  className="flex-container"
                >
                  <InstagramIcon />
                  {(desktop || isDesktop) && <span>Instagram</span>}
                </Link>
              </ListItem>
              <ListItem>
                <Link href={dataFooter.twitter_url} className="flex-container">
                  <TwitterIcon />
                  {(desktop || isDesktop) && <span>Twitter</span>}
                </Link>
              </ListItem>
            </List>
          </Grid>
          {(smartTV || isSmartTV) && (
            <Grid item xs={4} className="footer-1">
              <List component="nav" aria-label="contacts">
                <ListItem>
                  <Link href="campania/1" className="flex-container">
                    <span>Campaña 1</span>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    href={dataFooter.linkedin_url}
                    className="flex-container"
                  >
                    <span>Campaña 2</span>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    href={dataFooter.instagram_url}
                    className="flex-container"
                  >
                    <span>Campaña 3</span>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    href={dataFooter.twitter_url}
                    className="flex-container"
                  >
                    <span>Campaña 4</span>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          )}
        </Grid>
      </footer>
    </>
  );
};

export default index;
