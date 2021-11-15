import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getOrganization } from "../../app/organization/organizationAsyncActions";
import { useHistory } from "react-router";
const OngDataVizualization = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ongData = useSelector((state) => state.organization.organization[0]);
  useEffect(() => {
    dispatch(getOrganization());
  }, []);
  return (
    <Grid container style={{ padding: 20 }}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom align="left">
          Datos actuales de la Organización
        </Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <List>
          <ListItem>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5" gutterBottom align="left">
                  Nombre
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1" gutterBottom align="left">
                  {ongData ? ongData.name : null}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5" gutterBottom align="left">
                  Descripción
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1" gutterBottom align="left">
                  {ongData ? ongData.short_description : null}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container xs={12}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h5" gutterBottom align="left">
                  Imagen
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <img src={ongData ? ongData.logo : null} alt="logo" />
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </List>
      </Grid>
      <Grid item xs={12} align="left">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => history.push("/backoffice/organization/edit")}
        >
          Editar
        </Button>
      </Grid>
    </Grid>
  );
};

export default OngDataVizualization;
