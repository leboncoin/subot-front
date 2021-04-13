import React from "react";
import {Link as RouterLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

function BtnLink(props) {
  const {to} = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} innerRef={ref}/>
      )),
    [to],
  );

  return (
    <Button component={renderLink} {...props}>
      {props.children}
    </Button>
  );
}

export default BtnLink;