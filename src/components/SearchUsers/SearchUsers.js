import React, { useMemo, useRef, useState } from "react";
import {
  InputBase,
  Paper,
  makeStyles,
  List,
  ListItem,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import debounce from "lodash.debounce";
import { usersAPI } from "../../api/methods";
import { SweetAlert } from "../../utils/SetupAlert";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: ".5rem 1rem",
    position: "relative",
  },
  input: {
    marginRight: "1rem",
  },
  results: {
    position: "absolute",
    backgroundColor: "white",
    left: 0,
    right: 0,
    top: "100%",
    zIndex: 1,
    marginTop: ".5rem",
  },
  resultsList: {
    padding: 0,
  },
  resultsListItem: {
    padding: ".5rem 1rem",
  },
}));

const SearchUsers = () => {
  const history = useHistory();
  const classes = useStyles();
  const [results, setResults] = useState([]);

  const fetchResults = useRef();
  fetchResults.current = async (e) => {
    const { value } = e.target;
    if (e.target.value === "") return;
    if (value.length >= 4) {
      // eslint-disable-next-line prettier/prettier
      const url = `${process.env.REACT_APP_URL}users?search=${value.trim()}`;
      await axios
        .get(url)
        .then((res) => setResults(res.data.data))
        .catch(() => SweetAlert("error"));
    } else {
      await usersAPI
        .getAll()
        .then((res) => setResults(res.data.data))
        .catch(() => SweetAlert("error"));
    }
  };

  const debounceChange = useMemo(
    () => debounce((...args) => fetchResults.current(...args), 500),
    []
  );

  return (
    <Paper className={classes.root}>
      <InputBase
        placeholder="Buscar Usuario"
        className={classes.input}
        onChange={(e) => {
          e.persist();
          debounceChange(e);
        }}
        onBlur={() => setTimeout(() => setResults([]), 100)}
        fullWidth
      />

      <Search />

      {results.length ? (
        <Paper className={classes.results}>
          <List className={classes.resultsList}>
            {results.slice(0, 10).map((res) => (
              <ListItem
                onClick={() => history.push(`/users/${res.id}`)}
                button
                key={res.id}
                className={classes.resultsListItem}
              >
                {res.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : null}
    </Paper>
  );
};
export default SearchUsers;
