import React, { useEffect, useState } from "react";
import { InputBase, makeStyles } from "@material-ui/core";
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
const index = ({ setActivitiesData, dataAPI, name }) => {
  const classes = useStyles();
  const [formInput, setFormInput] = useState("");
  // "toggleNewsAll" works as a flag to get all the news only once
  const [toggleNewsAll, setToggleNewsAll] = useState(false);
  useEffect(() => {
    const getSearch = async () => {
      if (formInput.length >= 3) {
        await dataAPI.Get(`${name}?search=${formInput}`).then((res) => {
          setActivitiesData(res.data.data);
          setToggleNewsAll(false);
        });
      } else {
        if (!toggleNewsAll) {
          dataAPI.getAll().then((res) => {
            setActivitiesData(res.data.data);
            setToggleNewsAll(true);
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
          placeholder="Buscar Categoria..."
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
