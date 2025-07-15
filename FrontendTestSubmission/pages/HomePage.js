import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { generateShortcode, storeURL } from "../utils/shortener";
import { logEvent } from "../../LoggingMiddleware/logger";

function HomePage() {
  const [urls, setUrls] = useState([
    { longUrl: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);

  const changeField = (i, key, val) => {
    const temp = [...urls];
    temp[i][key] = val;
    setUrls(temp);
  };

  const add = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const shorten = () => {
    let res = [];

    for (let i = 0; i < urls.length; i++) {
      let u = urls[i];
      if (!u.longUrl.startsWith("http")) {
        alert("Invalid URL");
        logEvent("frontend", "error", "component", "Bad URL");
        continue;
      }

      let code = u.shortcode || generateShortcode();
      let valid = parseInt(u.validity) || 30;
      let now = Date.now();
      let expiry = new Date(now + valid * 60000).toISOString();

      let obj = {
        longUrl: u.longUrl,
        shortcode: code,
        createdAt: new Date(now).toISOString(),
        expiry: expiry,
        clicks: [],
      };

      storeURL(obj);
      logEvent("frontend", "info", "component", "Short created: " + code);

      res.push({
        short: code,
        expiry: expiry,
        longUrl: u.longUrl,
      });
    }

    setResults(res);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} style={{ marginBottom: 10 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Long URL"
              fullWidth
              value={u.longUrl}
              onChange={(e) => changeField(i, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Validity (min)"
              type="number"
              fullWidth
              value={u.validity}
              onChange={(e) => changeField(i, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Shortcode"
              fullWidth
              value={u.shortcode}
              onChange={(e) => changeField(i, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button onClick={add} variant="outlined" style={{ marginRight: 10 }}>
        + Add
      </Button>
      <Button onClick={shorten} variant="contained">
        Shorten
      </Button>

      <Box mt={4}>
        {results.map((r, i) => (
          <Box key={i} mb={2}>
            <Typography>
              <div>
                <b>Original:</b> {r.longUrl}
              </div>
              <div>
                <b>Short:</b>{" "}
                <a href={`/${r.short}`} target="_blank" rel="noreferrer">
                  {r.short}
                </a>
              </div>
              <div>
                <b>Expires:</b> {r.expiry}
              </div>
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default HomePage;
