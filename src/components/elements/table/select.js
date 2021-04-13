import React from 'react';
import Chip from "@material-ui/core/Chip/index";
import * as _ from 'lodash';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";

export default function TableSelect(props) {
  const [value, setValue] = React.useState(props.data);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const renderValue = (selected) => {
    return (<div>
      {selected.map((value) => (
        <Chip key={value} label={value}/>
      ))}
    </div>)
  }

  let {options, loading, id: key, editable} = props;

  return (
    <div style={{textAlign: "center"}}>
      {loading ?
        <CircularProgress/>
        :
        <Select
          key={key}
          multiple={true}
          disabled={!editable}
          value={value}
          onClose={() => props.handleChange(value)}
          onChange={handleChange}
          input={<Input key={`input-${key}`}/>}
          renderValue={renderValue}
        >
          {_.map(_.sortBy(options), (o) => (
            <MenuItem key={`menu-${key}-${o}`} value={o}>
              <Checkbox checked={value.indexOf(o) > -1}/>
              {o}
            </MenuItem>
          ))}
        </Select>
      }
    </div>
  )
}
