import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  DeleteOutline as DeleteOutlineIcon,
  EditOutlined as EditOutlinedIcon,
  Add as AddIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import "./MemberList.scss";
import BackofficeMembersSearch from "../BackofficeMembersSearch";
import { membersAPI } from "../../api/methods";
import { useSpinner } from "../../hooks/useSetupSpinner";
const MembersList = () => {
  const spinner = useSpinner();
  const [membersData, setMembersData] = useState([]);
  // Pagination component states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    spinner.set();
    membersAPI
      .getAll()
      .then((res) => setMembersData(res.data.data))
      .finally(() => spinner.remove());
  }, []);

  const handlerDelete = (id) => {
    let newMembersData = membersData.filter((element) => {
      if (element.id !== id) return true;
      else return false;
    });
    setMembersData(setMembersData);
  };
  const handlerEdit = () => {
    alert("To Edit");
  };

  // Methods for the Pagination component
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" align="left">
          Miembros
        </Typography>
        <BackofficeMembersSearch setMembersData={setMembersData} />
        <Button
          component={LinkRouter}
          to="/backoffice/members/create"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#9AC9FB", textDecoration: "none" }}
        >
          <AddIcon />
          &nbsp;Crear
        </Button>
      </Box>
      {/* Table of Members */}
      {spinner.state ? (
        spinner.loader
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Foto</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align="center">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            {/* MemberList Mapping */}
            <TableBody>
              {membersData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element) => (
                  <TableRow key={element.id}>
                    {/* Photo */}
                    <TableCell align="center">
                      <div className="frameImg">
                        <img src={element.image} alt="imageMember" />
                      </div>
                    </TableCell>
                    {/* Name */}
                    <TableCell scope="row" align="center">
                      {element.name}
                    </TableCell>
                    {/* Button Edit */}
                    <TableCell scope="row" align="center">
                      <Button
                        onClick={() => {
                          handlerEdit();
                        }}
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#59C371" }}
                      >
                        <EditOutlinedIcon />
                        &nbsp;Editar
                      </Button>
                    </TableCell>
                    {/* Button Delete */}
                    <TableCell scope="row" align="center">
                      <Button
                        onClick={() => {
                          handlerDelete(element.id);
                        }}
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: "#DB5752" }}
                      >
                        <DeleteOutlineIcon />
                        &nbsp;Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            component="div"
            count={membersData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 3, 5]}
          />
        </TableContainer>
      )}
    </>
  );
};
export default MembersList;
