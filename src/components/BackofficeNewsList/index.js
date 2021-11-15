import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
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
import { Link as LinkRouter } from "react-router-dom";
import "./index.scss";
import BackofficeNewSearch from "../BackofficeNewSearch";
import { newsAPI } from "../../api/methods.js";
import { SweetAlert } from "../../utils/SetupAlert.js";
import { useSpinner } from "../../hooks/useSetupSpinner.js";
// Mockup members list

const index = () => {
  const spinner = useSpinner();
  const [newsList, setNewsList] = useState([]);
  // Pagination component states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* const { state, set, remove, loader } = useSpinner(); */

  const handlerDelete = (id) => {
    console.log("newsDelete");
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
  useEffect(() => {
    const connect = async () => {
      try {
        spinner.set();
        const { data } = await newsAPI.getAll();
        setNewsList(data.data);
        setToggleNewsAll(true);
      } catch (err) {
        console.log("error");
      } finally {
        spinner.remove();
      }
    };
    connect();
  }, []);

  return (
    <>
      {/* Button Create */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Noticias</Typography>

        <BackofficeNewSearch setNews={setNewsList} />

        <Button
          component={LinkRouter}
          to="/backoffice/news/create"
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#9AC9FB",
            textDecoration: "none",
            color: "#fafafa",
          }}
        >
          <AddIcon />
          &nbsp;Crear
        </Button>
      </Box>

      {/* Table of news */}
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
              {newsList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element) => (
                  <TableRow key={element.id}>
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
                        style={{ backgroundColor: "#59C371", color: "#fafafa" }}
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
            rowsPerPageOptions={[
              5,
              10,
              { label: "All", value: newsList.length },
            ]}
            component="div"
            count={newsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
};

export default index;
