import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { activitiesAPI } from "../../../api/methods";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./style.scss";
import { ItemActivity } from "./ItemActivity";
import { Link as RouterLink } from "react-router-dom";
import BackofficeActivitySearch from "../../BackofficeActivitySearch/index";
import { useSpinner } from "../../../hooks/useSetupSpinner.js";

export default function ListActivities({ setElement }) {
  const [activitiesData, setActivitiesData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { state, set, remove, loader } = useSpinner();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    const connect = async () => {
      try {
        set();
        const { data } = await activitiesAPI.getAll();
        remove();
      } catch (err) {
      } finally {
        remove();
      }
    };
    connect();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Activities</Typography>
        <BackofficeActivitySearch
          setActivitiesData={setActivitiesData}
          set={set}
          remove={remove}
        />

        <RouterLink to="/backoffice/activities/create">
          <Button
            className="button-options background-light"
            startIcon={<AddIcon />}
          >
            Crear
          </Button>
        </RouterLink>
      </Box>
      {state ? (
        loader
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              style={{ border: "1px solid #ccc" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Images</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell colSpan={2} align="center">
                    options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activitiesData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <ItemActivity
                        activitiesData={activitiesData}
                        setElement={setElement}
                        setActivitiesData={setActivitiesData}
                        row={row}
                        key={index}
                        id={row.id}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { label: "All", value: activitiesData.length },
            ]}
            component="div"
            count={activitiesData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
