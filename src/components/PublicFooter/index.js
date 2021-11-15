import React, { useEffect, useState } from "react";
import { organizationAPI } from "../../api/methods.js";
import "./style.scss";
import "../../assets/structure.scss";
import { Grid, Link, List, ListItem } from "@material-ui/core";
const index = () => {
  const [dataFooter, setDataFooter] = useState({ name: "" });
  useEffect(() => {
    const connect = async () => {
      await organizationAPI.getAll().then((response) => {
        setDataFooter(response.data.data);
      });
    };
    connect();
  }, []);
  return (
    <>
      <footer
        className={`blue style-footer footer`}
        style={{ boxShadow: "0px -1px 2px #ccc", marginTop: "20px" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4} className="footer-1">
            <Link href="/" className="text-name">
              <img src="images/ong/colorfullLogo.png" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <List component="nav" aria-label="contacts">
              <ListItem button>
                <Link href="/">Inicio</Link>
              </ListItem>
              <ListItem button>
                <Link href="/nosotros">Nosotros</Link>
              </ListItem>
              <ListItem button>
                <Link href="/news">Novedades</Link>
              </ListItem>
              <ListItem button>
                <Link href="contacto">Contacto</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <List component="nav" aria-label="contacts">
              <ListItem button>
                <Link
                  target="_blank"
                  href={`https://${dataFooter.facebook_url}`}
                  rel="noreferrer noopener"
                >
                  Facebook
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  target="_blank"
                  href={`https://${dataFooter.linkedin_url}`}
                  rel="noreferrer noopener"
                >
                  Linkedin
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  target="_blank"
                  href={`https://${dataFooter.instagram_url}`}
                  rel="noreferrer noopener"
                >
                  Instagram
                </Link>
              </ListItem>
              <ListItem button>
                <Link
                  target="_blank"
                  href={`https://${dataFooter.twitter_url}`}
                  rel="noreferrer noopener"
                >
                  <span>Twitter</span>
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </footer>
    </>
  );
};

export default index;
