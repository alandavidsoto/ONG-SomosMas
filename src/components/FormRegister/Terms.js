import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import PDF from "./TermsConditions.pdf";
import { Button, Typography, Container } from "@material-ui/core";

const Terms = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function previousPage() {
    setPageNumber((prevState) => prevState - 1);
  }

  function nextPage() {
    setPageNumber((prevState) => prevState + 1);
  }

  return (
    <div style={{ margin: "5px" }}>
      <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages && (
        <Container fixed style={{ textAlign: "center" }}>
          <Typography variant="body2">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            style={{ margin: "5px" }}
          >
            Prev
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            style={{ margin: "5px" }}
          >
            Next
          </Button>
        </Container>
      )}
    </div>
  );
};

export default Terms;
