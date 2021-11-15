import React, { useState, useEffect } from "react";
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
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSlides, deleteSlide } from "../../app/slides/slidesAsyncActions";
import { slidesAPI } from "../../api/methods";
import { selectAllSlides } from "../../app/slides/slidesSelector";
import SearchIcon from "@material-ui/icons/Search";
import { useSpinner } from "../../hooks/useSetupSpinner";
import { SweetAlert } from "../../utils/SetupAlert";
const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    boxShadow: "0px 0px 3px #aaa",
    width: "60%",
    margin: "40px auto",
    padding: "7px",
    borderRadius: "5px",
    position: "relative",
  },
  input: {
    width: "90%",
  },
  SearchIcon: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const BackofficeSlides = ({ setElement }) => {
  const loading = useSelector((state) => state.slides.status);
  const classes = useStyles();
  const [formInput, setFormInput] = useState("");
  // "toggleNewsAll" works as a flag to get all the news only once
  const [toggleShowAllSlides, setToggleShowAllSlides] = useState(false);
  const [filteredSlides, setFilteredSlides] = useState(null);
  const slidesData = useSelector(selectAllSlides);
  // data for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const history = useHistory();
  const { state, set, remove, loader } = useSpinner();

  const showedSlides = filteredSlides ? filteredSlides : slidesData;

  useEffect(() => {
    if (formInput.length >= 3) {
      set();
      slidesAPI.Get(`slides?search=${formInput}`).then((res) => {
        setFilteredSlides(res.data.data);
        setToggleShowAllSlides(false);
        remove();
      });
    } else {
      if (!toggleShowAllSlides) {
        set();
        dispatch(getSlides());
        setFilteredSlides(null);
        setToggleShowAllSlides(true);
        remove();
      }
    }
  }, [formInput]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // mediaquery
  const smallScreenWidth = window.innerWidth <= 650;

  const handleDelete = (id) => {
    dispatch(deleteSlide(id));
  };
  const handleEdit = (row) => {
    setElement(row);
    history.push("/backoffice/slides/edit");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Slides</Typography>

        <div className={classes.wrapper}>
          <InputBase
            placeholder="Buscar Slide"
            onChange={(e) => setFormInput(e.target.value)}
            inputProps={{ "aria-label": "search" }}
            className={classes.input}
          />
          <div className={classes.SearchIcon}>
            <SearchIcon />
          </div>
        </div>

        <Button
          variant="contained"
          onClick={() => history.push("/backoffice/slides/create")}
          style={{
            backgroundColor: "#9AC9FB",
            color: "#fafafa",
          }}
        >
          <AddIcon /> Crear
        </Button>
      </Box>

      {loading === "loading" ? (
        loader
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="slides table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Titulo</TableCell>
                <TableCell align="center">Imagen</TableCell>
                <TableCell align="center">Orden</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showedSlides
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      <img
                        src={row.image}
                        alt={row.name}
                        style={{
                          width: smallScreenWidth ? "60px" : "180px",
                          height: smallScreenWidth ? "50px" : "80px",
                          borderRadius: "20px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.order}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size={smallScreenWidth ? "small" : "medium"}
                        onClick={() => handleEdit(row)}
                        style={{
                          backgroundColor: "#59C371",
                          margin: "7px",
                          color: "#fafafa",
                        }}
                      >
                        <EditIcon /> {smallScreenWidth ? "" : "Editar"}
                      </Button>
                      <Button
                        variant="contained"
                        size={smallScreenWidth ? "small" : "medium"}
                        onClick={() => handleDelete(row.id)}
                        style={{
                          backgroundColor: "#DB5752",
                          margin: "7px",
                          color: "#fafafa",
                        }}
                      >
                        <DeleteIcon /> {smallScreenWidth ? "" : "Eliminar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={slidesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
export default BackofficeSlides;
