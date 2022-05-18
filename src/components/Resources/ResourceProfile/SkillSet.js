import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

const SkillSet = (props) => {
  const { skillDetails, skillCount, skillFormattedSet } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(false);
  }, [skillDetails, skillCount, skillFormattedSet]);

  const displayBlockContent = () => {
    if (isLoading) {
      return <LoadingPageSm />;
    } else {
      return renderSkillSet();
    }
  };

  const renderSkillSet = () => {
    if (skillDetails !== null && skillDetails) {
      return (
        <div>
          <div className="skill-holder flex-column mb-3">
            {skillDetails.map((item, key) => {
              return displaySkillItem(item, key);
            })}
          </div>
          {skillCount.skill_count > 7 ? (
            <div className="d-flex justify-content-end">
              <Button variant="primary" size="sm" onClick={() => handleShow()}>
                View All Skills
              </Button>
            </div>
          ) : null}

          {displaySkillModalContent()}
        </div>
      );
    } else {
      return <span className="text-muted">Nothing to display here!</span>;
    }
  };

  const displaySkillItem = (item) => {
    return (
      <div className="skill-wrapper my-1 me-1" key={item.skill_id.toString()}>
        <span className="text-x-sm-custom">{item.skill_name}</span>
      </div>
    );
  };

  const displaySkillModalContent = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
      >
        <Modal.Header>
          <div className="d-block">
            <span className="text-sm-custom text-dark-custom fw-bold-custom">
              My Skills
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>{displayAllSkills()}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} size="sm">
            Close Skill
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const displayAllSkills = () => {
    if (skillDetails !== null && skillDetails) {
      return (
        <div className="d-block">
          {skillFormattedSet.map((item, key) => {
            return (
              <div
                className="d-block mb-1"
                key={item.skill_category_id.toString()}
              >
                <div className="d-block">
                  <div className="d-block mb-1">
                    <span className="fw-bold-custom">
                      {item.skill_category_title}
                    </span>
                  </div>
                  <div className="d-block border-dark p-1 rounded">
                    {displayAllSkillSubCategory(item.sub_category)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <span className="text-muted">Nothing to display here!</span>;
    }
  };

  const displayAllSkillSubCategory = (subCat) => {
    if (subCat.length > 0) {
      return (
        <>
          {subCat.map((item, key) => {
            return (
              <div
                className="card mb-1 bg-light p-1"
                key={item.skill_sub_category_id.toString()}
              >
                <div className="p-1">
                  <div className="d-block">
                    <span className="text-dark fw-medium-custom">
                      {item.skill_sub_category_title}
                    </span>
                  </div>
                  <div className="d-block">
                    {displayAllSkill(item.skill_set)}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  const displayAllSkill = (skillArray) => {
    if (skillArray.length > 0) {
      return (
        <div className="d-flex flex-wrap">
          {skillArray.map((item, key) => {
            return displaySkillItem(item, key);
          })}
        </div>
      );
    }
  };

  return (
    <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-3 top-card-section">
      <div className="card-custom h-100">
        <div className="card-body ">
          <div className="d-block mb-3">
            <span className="fw-bold">My Skills</span>
          </div>
          {displayBlockContent()}
        </div>
      </div>
    </div>
  );
};

export default SkillSet;
