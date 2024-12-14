import React, { useEffect, useState } from "react";
import { Brush } from "lucide-react";
import Canvas from "./components/Canvas";
import { Toaster } from "react-hot-toast";
import ImagePreview from "./components/ImagePreview";

const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleMaskGenerated = (original, mask) => {
    setOriginalImage(original);
    setMaskImage(mask);
  };

  useEffect(() => {
    
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 850);
      };
  
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
  
      return () => {
        window.removeEventListener("resize", checkScreenSize);
      };
    }, []);
  if (isMobile) {
    return (
      <div className="not-supported">
        <p>We do not support small screens or mobile devices at the moment. Please switch to a larger screen.</p>
      </div>
    );
  }    
  return (
    <div className="container">
      <Toaster />
      <div className="heading">
        <span>
          <Brush color="blue" size={40} className="icon"/>
        </span>
        <h1>Image Painting Tool</h1>
        <p>Upload an image and draw on it to create a mask</p>
      </div>
      <div className="main">
        <Canvas onMaskGenerated={handleMaskGenerated} isMobile={isMobile}/>
        {
          originalImage && maskImage && (
            <ImagePreview originalImage={originalImage} maskImage={maskImage} />
            )
        }
      </div>
    </div>
  );
};

export default App;
