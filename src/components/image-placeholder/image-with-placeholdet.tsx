import React, { useState } from "react";
import "./image-placeholder.css";

type PropsT = {
  src: string;
  alt?: string;
  className?: string;
};

function ImageWithPlaceholder({ src, alt, className = "" }: PropsT) {
  const [loaded, setLoaded] = useState(false);
  console.log(loaded);

  return (
    <div className="image-container">
      {
        <img
          src={src}
          alt={alt}
          className={`${className}`}
          onLoad={() => setLoaded(true)} // Set loaded to true when the actual image is loaded
          onError={(e) => {
            console.error("Error loading image:", e);
          }}
        />
      }
      {/* {!loaded && (
        <div
          className={`image-placeholder-custom loading-animation ${className}`}
        >
          Image loading
        </div>
      )} */}
    </div>
  );
}

export default ImageWithPlaceholder;
