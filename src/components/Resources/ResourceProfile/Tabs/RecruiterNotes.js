import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import "./recruiterNotes.css";
import RecruiterNotesModal from "./RecruiterNotesAdd";

const RecruiterNotes = () => {
  const [show, setShow] = useState(false);
  const [noteText, setNoteText] = useState("met bob yesterday");

  const handleShow = () => setShow(true);

  return (
    <div>
      <RecruiterNotesModal show={show} setShow={setShow} noteText={noteText} />

      <div className="col-12 mb-3">
        <div className="col-12 notes-btn-add">
          <Button
            variant="warning"
            onClick={() => handleShow()}
            size="md"
            style={{ marginRight: "8px" }}
          >
            Add Note
          </Button>
        </div>
        <div className="card-custom">
          <div className="card-body">
            <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center">
              <p className="notes-message">{noteText}</p>
            </div>
            <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center">
              <i className="notes-name">Natalie Hand</i>
              <i className="notes-name">Jun 23,2021</i>
            </div>
            <div>
              <div>
                <Button
                  className="notes-btn-edit"
                  variant="success"
                  onClick={(event) => handleShow()}
                  size="md"
                >
                  Edit Note
                </Button>
                <Button variant="danger" size="md">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterNotes;
