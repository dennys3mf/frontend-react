import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import "./GifSearch.css"; // Importamos el archivo CSS

const GifSearch = () => {
  const [gifNumber, setGifNumber] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://g.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=${gifNumber}`
      );
      setGifUrl(response.data.results[gifNumber - 1].media[0].gif.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="container">
      {" "}
      {/* Usamos la clase CSS */}
      <Box className="formContainer">
        {" "}
        {/* Usamos la clase CSS */}
        <Typography variant="h4" align="center" gutterBottom>
          Buscador de GIFs
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="number"
            value={gifNumber}
            onChange={(e) => setGifNumber(e.target.value)}
            placeholder="Ingrese un número"
            required
            margin="normal"
            variant="outlined"
          />
          {gifUrl && (
            <img
              src={gifUrl}
              alt="GIF"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Buscar"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default GifSearch;
