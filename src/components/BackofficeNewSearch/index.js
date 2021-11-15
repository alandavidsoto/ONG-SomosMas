import React, { useEffect, useState } from "react";
import { InputBase, makeStyles } from "@material-ui/core";
import { newsAPI } from "../../api/methods";
import { useSpinner } from "../../hooks/useSetupSpinner";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    boxShadow: "0px 0px 3px #aaa",
    width: "60%",
    margin: "40px auto",
    padding: "7px",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
  },
  SearchIcon: {
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const index = ({ setNews }) => {
  const classes = useStyles();
  const [formInput, setFormInput] = useState("");
  // "toggleNewsAll" works as a flag to get all the news only once
  const [toggleNewsAll, setToggleNewsAll] = useState(false);
  const { state, set, remove, loader } = useSpinner();

  useEffect(() => {
    const getSearch = async () => {
      if (formInput.length >= 3) {
        set();
        await newsAPI.Get(`news?search=${formInput}`).then((res) => {
          setNews(res.data.data);
          setToggleNewsAll(false);
          remove();
        });
      } else {
        if (!toggleNewsAll) {
          set();
          newsAPI.getAll().then((res) => {
            setNews(res.data.data);
            setToggleNewsAll(true);
            remove();
          });
        }
      }
    };
    getSearch();
  }, [formInput]);

  return (
    <>
      <div className={classes.wrapper}>
        <InputBase
          placeholder="Buscar Novedad..."
          onChange={(e) => setFormInput(e.target.value)}
          inputProps={{ "aria-label": "search" }}
          className={classes.input}
        />
        <div className={classes.SearchIcon}>
          <SearchIcon />
        </div>
      </div>
    </>
  );
};

export default index;
