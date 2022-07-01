import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import InputLebelComponent from "../../../InputLebel/InputLebelComponent";

const NoteAddModal = (props) => {
  const { noteText } = props;

  const handleClose = () => {
    props.setShow(false);
    window.location.reload(false);
  };

  const displaySubmitButton = () => {
    return (
      <div className="d-block">
        <Button variant="primary" size="md">
          Add Note
        </Button>
      </div>
    );
  };

  const displayUpdateButton = () => {
    return (
      <div className="d-block">
        <Button variant="primary" size="md">
          Update Note
        </Button>
      </div>
    );
  };

  const displayCloseButton = () => {
    return (
      <div className="d-block me-3">
        <Button variant="dark" onClick={() => closeAddModal()} size="md">
          Close
        </Button>
      </div>
    );
  };

  const closeAddModal = () => {
    props.setShow(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => handleClose()}
      scrollable={true}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className="d-block">
          <div className="d-block">
            <span className="h5 fw-bold-custom">Add Note</span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form id="create-frm">
          <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
            <div className="col-12 col-md-12 col-lg-12 col-xlg-12">
              <div className="form-input-holder">
                <InputLebelComponent title="Note" />
                <div className="d-block">
                  <textarea
                    type="textarea"
                    className="form-control-custom"
                    id="add-note"
                    placeholder="Enter note"
                    defaultValue={noteText !== "" ? noteText : ""}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {displayCloseButton()}
            {noteText !== "" ? displayUpdateButton() : displaySubmitButton()}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NoteAddModal;
