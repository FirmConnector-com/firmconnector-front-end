import React, { useEffect, useState } from "react";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { PieChart } from "react-minimal-pie-chart";
import useWindowSize from "./WindowSize";

const AvailabilityHolder = (props) => {
  const { availabilityDetails } = props;
  const [isLoading, setIsLoading] = useState(true);
  const windowSize = useWindowSize();

  useEffect(() => {
    setIsLoading(false);
  }, [availabilityDetails]);

  const displayAvailabilityContent = () => {
    if (isLoading) {
      return <LoadingPageSm />;
    } else {
      return renderAvailability();
    }
  };

  const renderAvailability = () => {
    if (availabilityDetails !== null && availabilityDetails) {
      var chartColor = "#DC143C";

      if (availabilityDetails.availability <= 5) {
        chartColor = "#DC143C";
      } else if (
        availabilityDetails.availability > 5 &&
        availabilityDetails.availability < 20
      ) {
        chartColor = "#FFBF00";
      } else {
        chartColor = "#32CD32";
      }
      return (
        <PieChart
          animate={true}
          animationDuration={500}
          animationEasing="ease-out"
          center={windowSize.width < 767 ? [25, 25] : [50, 50]}
          totalValue={40}
          data={[
            {
              color: chartColor,
              value: parseInt(availabilityDetails.availability),
            },
          ]}
          labelPosition={50}
          lengthAngle={360}
          lineWidth={30}
          paddingAngle={0}
          radius={windowSize.width < 767 ? 24 : 50}
          startAngle={90}
          viewBoxSize={windowSize.width < 767 ? [50, 50] : [100, 100]}
          background={"#ccc"}
          style={{
            alignSelf: "center",
            width: windowSize.width < 767 ? "60%" : "100%",
          }}
        />
      );
    } else {
      return <span className="text-muted">Nothing to display here!</span>;
    }
  };

  return (
    <div className="col-12 mb-3">
      <div className="card-custom p-3">
        <div className="d-block mb-3">
          <span className="fw-bold">Current Availability</span>
        </div>

        {displayAvailabilityContent()}

        <div className="d-flex justify-content-center align-items-center mt-2">
          <span className="fw-bold">
            {parseInt(availabilityDetails?.availability)}hrs / week
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityHolder;
