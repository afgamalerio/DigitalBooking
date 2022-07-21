import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./selectOptions.scss";

export default function SelectOption({ ciudad, pais }) {
  return (
    <div>
      <div className="option">
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="option-icon"/>
        </p>
        <div className="option-location">
          <h4>{ciudad}</h4>
          <h5>{pais}</h5>
        </div>
      </div>
    </div>
  );
}