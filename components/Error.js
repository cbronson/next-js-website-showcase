import { Alert, AlertTitle, Link } from "@mui/material";

export default function Error({ message }) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <div>
        Something Went Wrong — <strong>{message}</strong>
      </div>
    </Alert>
  );
}
