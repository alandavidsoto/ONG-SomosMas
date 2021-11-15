import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { activitiesAPI } from "../../../api/methods";

export const ItemActivity = (props) => {
  const { activitiesData, setActivitiesData, row, index, id, setElement } =
    props;
  const deleteActivity = (id) => {
    activitiesAPI.delete(id).then(() => {
      const updatedActivities = activitiesData.filter((activities) => {
        return activities.id !== id;
      });
      setActivitiesData(updatedActivities);
    });
  };
  const history = useHistory();
  const editActivity = (row) => {
    setElement(row);
    history.push("/backoffice/activities/edit");
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={index}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          <img src={row.image} alt={row.name} style={{ width: "60px" }} />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.createdAt}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            className="button-options background-green"
            onClick={() => editActivity(row)}
          >
            <EditIcon />
            Editar
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            className="button-options background-red"
            onClick={() => deleteActivity(id)}
          >
            <DeleteIcon />
            Eliminar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
