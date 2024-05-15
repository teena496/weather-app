import { Container, TextField, Button } from "@mui/material";
import React from "react";

export default function Search({ searchText, setSearchtext, onSearchClick }) {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBlock: "100px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter City"
          variant="filled"
          value={searchText}
          onChange={(e) => setSearchtext(e.target.value)}
        />
        <Button onClick={onSearchClick} variant="contained">
          Search
        </Button>
      </Container>
    </>
  );
}
