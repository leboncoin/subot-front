import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from "@material-ui/core/TextField";


class EditableChip extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      editMode: false,
      text: props.label
    }
  }

  handleChange(e) {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      this.state.editMode ?
        <TextField
          defaultValue={this.state.text}
          autoFocus={true}
          onBlur={() => this.setState({editMode: false})}
          onChange={(e) => this.setState({text: e.target.value})}
        /> :
        <Chip
          label={this.state.text}
          onDelete={this.props.onDelete}
          onClick={() => this.setState({editMode: true})}
        />
    );
  }
}

export default EditableChip;