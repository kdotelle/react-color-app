import React, { Component } from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule(
      "isPaletteNameUnique",
      (value) =>
        this.props.palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ) && value.toLowerCase() !== "new"
    );
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  showEmojiPicker() {
    this.setState({
      stage: "emoji",
    });
  }
  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSubmit(newPalette);
    this.setState({
      stage: "",
    });
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      newPaletteName: "",
    });
  };

  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle>Choose A Palette Emoji</DialogTitle>
          <Picker onSelect={this.savePalette} />
        </Dialog>
        <Dialog open={stage === "form"} onClose={hideForm}>
          <DialogTitle>Choose A Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a unique name for your new palette.
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name Already Used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                {" "}
                Save Palette{" "}
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
