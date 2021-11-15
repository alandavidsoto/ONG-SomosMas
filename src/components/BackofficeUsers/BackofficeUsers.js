import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import SearchUsers from "../SearchUsers/SearchUsers";

const BackofficeUsers = () => {
  // data for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const history = useHistory();
  const handleDelete = () => {
    alert("delete placeholder");
  };
  const handleEdit = () => {
    alert("edit placeholder");
  };
  const mockedUserData = [
    {
      name: "usertest24",
      email: "usertest24@usertest.com.ar",
    },
    {
      name: "DRFGDFG",
      email: "GDFGDFG@DFGDF.CDSFSD",
    },
    {
      name: "Test",
      email: "test@alkemy.com",
    },
    {
      name: "testy",
      email: "testy@joroba.com",
    },
    {
      name: "testyy",
      email: "testyy@joroba.com",
    },
    {
      name: "jkhjk",
      email: "jojo@gmail.com",
    },
    {
      name: "hjyjuy",
      email: "juju@gmail.com",
    },
    {
      name: "juju",
      email: "jofffffjo@gmail.com",
    },
    {
      name: "ijijiji",
      email: "jojojojojjojoo@gmail.com",
    },
    {
      name: "jjhjh",
      email: "jjhjh@gmail.com",
    },
  ];
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Users</Typography>

        <Button
          variant="contained"
          onClick={() => history.push("/backoffice/users/create")}
          style={{
            backgroundColor: "#9AC9FB",
            color: "#fafafa",
          }}
        >
          <AddIcon /> Crear
        </Button>
      </Box>
      <SearchUsers />
      <TableContainer component={Paper}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockedUserData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size={"medium"}
                      onClick={() => handleEdit()}
                      style={{
                        backgroundColor: "#59C371",
                        margin: "7px",
                        color: "#fafafa",
                      }}
                    >
                      <EditIcon /> Editar
                    </Button>
                    <Button
                      variant="contained"
                      size={"medium"}
                      onClick={() => handleDelete()}
                      style={{
                        backgroundColor: "#DB5752",
                        margin: "7px",
                        color: "#fafafa",
                      }}
                    >
                      <DeleteIcon />
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={mockedUserData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default BackofficeUsers;
