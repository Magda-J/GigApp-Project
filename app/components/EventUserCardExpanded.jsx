import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import CardLarge from "./CardLarge";
import EventUserCardLarge from "./EventUserCardLarge";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EventUserCardExpanded({
  open,
  handleClose,
  event,
  img,
  EventName,
  EventDate,
  EventCity,
  EventTime,
  EventPhoto,
  EventVenue,
  EventCountryCode,
  EventPostcode,
}) {
  useEffect(() => {
    console.log(event);
  }, [event]);

  if (!event) {
    return null;
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="w-1/2 mx-auto"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <EventUserCardLarge
          event={event}
          img={img}
          EventDate={EventDate}
          EventName={EventName}
          EventCity={EventCity}
          EventTime={EventTime}
          EventPhoto={EventPhoto}
          EventVenue={EventVenue}
          EventCountryCode={EventCountryCode}
          EventPostcode={EventPostcode}
        />
      </BootstrapDialog>
    </React.Fragment>
  );
}
