import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import { categoriesAPI } from "../../api/methods";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
} from "../../app/categories/categoriesAsyncActions";
import { selectAllCategories } from "../../app/categories/categoriesSelectors";
import BackofficeSearch from "../BackofficeSearch";
import { useSpinner } from "../../hooks/useSetupSpinner";

const BackofficeCategoryVisualization = ({ setElement }) => {
  const loading = useSelector((state) => state.categories.status);
  const { loader } = useSpinner();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const screenWidth = window.innerWidth <= 420;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categoriesData, setCategoriesData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getCategories());
    setCategoriesData(categories);
  }, []);

  const handleDeleteCategory = (id) => {
    //replace this confirm pop up with a Modal
    if (confirm("Eliminar categoría")) {
      dispatch(deleteCategory(id));
    }
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
        <Typography variant="h2">Categorías</Typography>
        <BackofficeSearch
          setActivitiesData={setCategoriesData}
          dataAPI={categoriesAPI}
          name="categories"
        />
        <Button
          variant="contained"
          size="large"
          href="/backoffice/categories/create"
          style={{
            backgroundColor: "#9AC9FB",
            color: "#fafafa",
          }}
          startIcon={<AddIcon />}
        >
          Crear
        </Button>
      </Box>
      {loading === "loading" ? (
        loader
      ) : (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell scope="row">Categoría</TableCell>
                  <TableCell scope="row">Creado</TableCell>
                  <TableCell scope="row" colSpan={2}>
                    {" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? [...categoriesData]
                      .sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : categoriesData
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {format(parseISO(row.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/backoffice/categories/edit`}
                        onClick={() => setElement(row)}
                      >
                        <Button
                          variant="contained"
                          size={screenWidth ? "small" : "medium"}
                          onClick={() => {}}
                          style={{
                            backgroundColor: "#59C371",
                            color: "#fafafa",
                          }}
                        >
                          <EditIcon /> {screenWidth ? "" : "Editar"}
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <Button
                        variant="contained"
                        size={screenWidth ? "small" : "medium"}
                        onClick={() => handleDeleteCategory(row.id)}
                        style={{
                          backgroundColor: "#DB5752",
                          color: "#fafafa",
                        }}
                      >
                        <DeleteIcon /> {screenWidth ? "" : "Eliminar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "Datos por página" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </>
  );
};

export default BackofficeCategoryVisualization;
