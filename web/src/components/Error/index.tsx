import React, { useState } from "react";
import { useRootContext } from "../../context/index";
import { IconButton, Collapse, Container } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ErrorActionType } from "../../action/type";

export const Error: React.FC = () => {
  const { error, dispatchErrorMessage } = useRootContext();
  const [open, setOpen] = useState(true);

  const handleOnClose = () => {
    setOpen(false);
    dispatchErrorMessage({
      type: ErrorActionType.DELETE_ERROR,
      payload: "",
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        {error && (
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleOnClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Collapse>
        )}
      </Container>
    </>
  );
};
