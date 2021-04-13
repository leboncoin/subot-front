import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Tab(props) {
  return [
    <Typography key={`title-${props.title}`} variant="h4">{props.title}</Typography>,
    <Typography key={`subtitle-${props.subtitle}`} variant="body1">{props.subtitle}</Typography>,
    props.children
  ]
}