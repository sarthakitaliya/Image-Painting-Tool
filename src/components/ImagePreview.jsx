import React from "react";
import "./ImagePreview.css";
const ImagePreview = ({ originalImage, maskImage }) => {
  return (
    <div className="image-preview">
      <h1>Image Preview</h1>
      <div className="image-container">
        <div>
          <h2>Original Image</h2>
          <img src={originalImage} alt="Original" />
        </div>
        <div>
          <h2>Mask Image</h2>
          <img src={maskImage} alt="Mask" />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
