import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import RecruiterNotesModal from "./RecruiterNotesAdd";
import RecruiterNotesEdit from "./RecruiterNotesEdit";

import { AlertInfo } from "../../../Alerts/Alert";
import { useAuthContext } from "../../../../context/AuthContext";

import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2-react-content";

import removeNote from "../../../../apis/removeNote";

const RecruiterNotes = (props) => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const MySwal = swalWithBootstrapButtons(Swal);

  const { recruiterNotes, resourceSlug } = props;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedNoteSlug, setSelectedNoteSlug] = useState(false);

  const handleShow = () => setShow(true);
  const handleShowEdit = (slug) => {
    setShowEdit(true);
    setSelectedNoteSlug(slug);
  };

  useEffect(() => {}, [selectedNoteSlug]);

  const displayAddNoteButton = () => {
    return (
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary" onClick={() => handleShow()} size="md">
          Add Note
        </Button>
      </div>
    );
  };

  const removeNoteItem = (n_slug) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "that you want to remove this note",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--black)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSelectedNote(n_slug);
      }
    });
  };

  const removeSelectedNote = (n_slug) => {
    let formData = {
      r_slug: user_slug,
      note_slug: n_slug,
    };

    try {
      removeNote(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (data.data.status === 0) {
            await MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>{data.data.message}</i>,
              icon: "danger",
            });
          } else {
            await MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>{data.data.status}</i>,
              icon: "danger",
            });
          }
        } else {
          await MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>{data.data.message}</i>,
            icon: "danger",
          });
        }
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Something wrong happened!</i>,
        icon: "danger",
      });
    }
  };

  const displayNotes = () => {
    if (recruiterNotes) {
      return (
        <div>
          {recruiterNotes.map(function (item, index) {
            return (
              <div className="d-block" key={index.toString()}>
                <div className="card-custom">
                  <div className="card-body">
                    <div className="d-block">
                      <p>{item.note}</p>
                    </div>
                    <div className="d-block my-2">
                      <div className="d-flex flex-column align-items-end">
                        <i className="fw-bold">{item.r_name}</i>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <span className="text-secondary">{item.added_on}</span>
                      </div>
                    </div>
                    {user_slug === item.r_slug ? (
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="success"
                          onClick={(event) => handleShowEdit(item.note_slug)}
                          size="sm"
                          className="me-2"
                        >
                          Edit Note
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeNoteItem(item.note_slug)}
                        >
                          Remove Note
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <AlertInfo title={"Oops"} message={["No notes found!"]} />;
    }
  };

  return (
    <div>
      <RecruiterNotesModal
        show={show}
        setShow={setShow}
        resourceSlug={resourceSlug}
      />
      {showEdit ? (
        <RecruiterNotesEdit
          show={showEdit}
          setShow={setShowEdit}
          resourceSlug={resourceSlug}
          noteSlug={selectedNoteSlug}
        />
      ) : null}

      {displayAddNoteButton()}
      {displayNotes()}
    </div>
  );
};

export default RecruiterNotes;
