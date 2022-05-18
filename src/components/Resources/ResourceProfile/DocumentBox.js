import React, { useEffect, useState } from "react";
import DocumentHolderSm from "./DocumentHolderSm";
import ButtonSm from "../../Buttons/ButtonSm";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

const DocumentBox = (props) => {
  const { documentDetails } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [documentDetails]);

  const displayBlockContent = () => {
    if (isLoading) {
      return <LoadingPageSm />;
    } else {
      return renderDocuments();
    }
  };

  const renderDocuments = () => {
    if (documentDetails !== null && documentDetails) {
      return (
        <div>
          <div className="document-holder-inner mb-3">
            {documentDetails.map((item) => {
              return (
                <div key={item.document_id.toString()}>
                  <DocumentHolderSm
                    title={item.document_title}
                    path={item.document_path}
                  />
                </div>
              );
            })}
          </div>
          {documentDetails.length > 4 ? (
            <div className="d-flex justify-content-end">
              <ButtonSm
                className="btn-primary-custom"
                role="button"
                title="View All"
                type="button"
                to={"#"}
              />
            </div>
          ) : null}
        </div>
      );
    } else {
      return <span className="text-muted">Nothing to display here!</span>;
    }
  };
  return (
    <div className="col-12 mb-3 docuament-box-holder">
      <div className="card-custom">
        <div className="card-body ">
          <div className="d-block mb-3">
            <span className="fw-bold">Files / Documents</span>
          </div>

          {displayBlockContent()}
        </div>
      </div>
    </div>
  );
};

export default DocumentBox;
