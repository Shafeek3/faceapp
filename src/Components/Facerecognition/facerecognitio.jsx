// Facerecognition.jsx
import React from "react";
import "./facerecognition.css";

const Facerecognition = ({ imageUrl, boxes }) => (
  <div className="center">
    <div className="relative mt2">
      {imageUrl && (
        <img
          id="inputimage"
          src={imageUrl}
          alt="Detected face"
          style={{ maxWidth: "700px", width: "100%", height: "auto" }}
        />
      )}
      {boxes.map((box, i) => (
        <div
          key={i}
          className="bounding-box"
          style={{
            top: `${box.top}px`,
            left: `${box.left}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
          }}
        />
      ))}
    </div>
  </div>
);

export default Facerecognition;
