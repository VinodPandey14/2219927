import React from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { getStoredURLs } from "../utils/shortener";
import { logEvent } from "../../LoggingMiddleware/logger";

function StatsPage() {
  const data = getStoredURLs();
  logEvent("frontend", "info", "page", "Opened stats");

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Stats
      </Typography>

      {data.length === 0 ? (
        <Typography>No shortened URLs yet.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((u, i) => (
              <TableRow key={i}>
                <TableCell>
                  <a href={`/${u.shortcode}`} target="_blank" rel="noreferrer">
                    {u.shortcode}
                  </a>
                </TableCell>
                <TableCell>{u.createdAt}</TableCell>
                <TableCell>{u.expiry}</TableCell>
                <TableCell>{u.clicks.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default StatsPage;
