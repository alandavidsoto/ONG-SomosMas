import React, { useEffect, useState } from "react";
import { InputBase, makeStyles } from "@material-ui/core";
import { membersAPI } from "../../api/methods";
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
const index = ({ setMembersData }) => {
  const classes = useStyles();
  const [formInput, setFormInput] = useState("");
  // "toggleNewsAll" works as a flag to get all the news only once
  const [toggleNewsAll, setToggleNewsAll] = useState(false);
  useEffect(() => {
    const getSearch = async () => {
      if (formInput.length >= 3) {
        await membersAPI.Get(`members?search=${formInput}`).then((res) => {
          setMembersData(res.data.data);
          setToggleNewsAll(false);
        });
      } else {
        if (!toggleNewsAll) {
          membersAPI.getAll().then((res) => {
            setMembersData(res.data.data);
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
          placeholder="Buscar miembros..."
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
