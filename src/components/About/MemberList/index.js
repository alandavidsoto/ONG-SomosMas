import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  List,
  Typography,
} from "@material-ui/core";
import { useGetAllMembers } from "../../../hooks/useGetAllMembers";
import MemberListItem from "./MemberListItem";

const MemberList = () => {
  const { loading, error, members } = useGetAllMembers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleNext = () => setPage((p) => p + 1);
  const handlePrev = () => {
    if (page === 0) return;
    else setPage((p) => p - 1);
  };

  if (loading)
    return (
      <Box
        minHeight={300}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  if (error)
    return (
      <Box
        minHeight={300}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Ha ocurrido un error</Typography>
      </Box>
    );
  if (!members.length)
    return (
      <Box
        minHeight={300}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>No hay miembros</Typography>
      </Box>
    );
  else
    return (
      <Box>
        <List>
          {members
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((member) => (
              <MemberListItem member={member} key={member.id} />
            ))}
        </List>
        <Box px={2} display="flex" justifyContent="flex-end">
          <Button
            disabled={page === 0}
            onClick={handlePrev}
            variant="contained"
            color="primary"
          >
            Anterior
          </Button>
          <Button
            disabled={Math.ceil(members.length / rowsPerPage - 1) === page}
            onClick={handleNext}
            variant="contained"
            color="primary"
            style={{ marginLeft: ".5rem" }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    );
};

export default MemberList;
