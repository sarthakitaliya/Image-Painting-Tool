import React, { useEffect, useRef, useState } from "react";
import "./Canvas.css";
import { Download, Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { fabric } from "fabric";
import DownloadPopup from "./DownloadPopup.jsx";

const Canvas = ({ onMaskGenerated, isMobile }) => {
  const [brushSize, setBrushSize] = useState(15);
  const [canvas, setCanvas] = useState(null);
  const [image, setImage] = useState(null);
  const [exportPopup, setExportPopup] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const resizeCanvas = () => {
    if (canvas && canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      console.log(parent);
      
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      canvas.setDimensions({ width, height });

      canvas.getObjects().forEach((obj) => {
        obj.scaleToWidth(width);
        obj.scaleToHeight(height);
        obj.setCoords();
      });

      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (!isMobile && canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: parent.offsetWidth,
        height: parent.offsetHeight,
      });
      window.addEventListener("resize", resizeCanvas);

      fabricCanvas.freeDrawingBrush.color = "white";
      fabricCanvas.freeDrawingBrush.width = brushSize;
      fabricCanvas.backgroundColor = "black";

      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [isMobile, window.onload]);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, canvas]);
  useEffect(() => {
    if (canvas) {
      const updateMask = () => {
        const imageObject = canvas.getObjects("image")[0];
        if (imageObject) imageObject.visible = false;
        const maskImage = canvas.toDataURL();
        onMaskGenerated(image, maskImage);
        if (imageObject) imageObject.visible = true;
      };

      const handlePathCreated = () => {
        canvas.renderAll();
        updateMask();
      };

      canvas.on("path:created", handlePathCreated);
      canvas.on("mouse:up", updateMask);

      return () => {
        canvas.off("path:created", handlePathCreated);
        canvas.off("mouse:up", updateMask);
      };
    }
  }, [canvas, image, onMaskGenerated]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        toast.error("Please upload a valid image file (PNG or JPEG).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB limit
        toast.error("File size exceeds 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
        fabric.Image.fromURL(e.target?.result, (img) => {
          canvas.clear();
          canvas.backgroundColor = "black";

          // Scale image to fit canvas while maintaining aspect ratio
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          img.scale(scale);

          // Center the image
          img.set({
            left: (canvas.width - img.width * scale) / 2,
            top: (canvas.height - img.height * scale) / 2,
          });
          const maskImage = canvas.toDataURL();
          onMaskGenerated(e.target?.result, maskImage);
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearCanvas = () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }
    if (canvas) {
      const imageObject = canvas.getObjects("image")[0];
      canvas.clear();
      canvas.backgroundColor = "black";

      const emptyMaskImage = canvas.toDataURL();
      onMaskGenerated(image, emptyMaskImage);

      if (imageObject) {
        canvas.add(imageObject);
      }
      canvas.isDrawingMode = true;
      canvas.renderAll();
    }
  };
  const handleExportChoice = (choice) => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }
    setExportPopup((prev) => !prev);
  };
  const handleExportMaskWithImage = () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }
    if (canvas) {
      const maskImage = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "mask.png";
      link.href = maskImage;
      link.click();
      setExportPopup(false);
    }
  };
  const handleExportMaskOnly = () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }
    if (canvas) {
      const imageObject = canvas.getObjects("image")[0];
      if (imageObject) imageObject.visible = false;

      const maskImage = canvas.toDataURL(); // Mask only
      const link = document.createElement("a");
      link.download = "mask-only.png";
      link.href = maskImage;
      link.click();

      if (imageObject) imageObject.visible = true; // Restore image visibility
      setExportPopup(false);
    }
  };
  return (
    <div className="canvas">
      {exportPopup && (
        <DownloadPopup
          setExportPopup={setExportPopup}
          handleExportMaskWithImage={handleExportMaskWithImage}
          handleExportMaskOnly={handleExportMaskOnly}
        />
      )}
      <div className="canvas-options">
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          hidden
          onChange={handleImageUpload}
        />
        <div className="options">
          <button onClick={() => fileInputRef.current.click()}>
            Upload Image
          </button>
          <div className="option-icon">
            <span
              className="minus-icon"
              onClick={() => setBrushSize((prev) => Math.max(1, prev - 5))}
            >
              <Minus color="black" size={25} />
            </span>
            <p>{brushSize}px</p>
            <span
              className="plus-icon"
              onClick={() => setBrushSize((prev) => Math.min(50, prev + 5))}
            >
              <Plus color="black" size={25} />
            </span>
            <span className="delete-icon" onClick={handleClearCanvas}>
              <Trash2 color="black" size={25} />
            </span>
            <span className="download-icon" onClick={handleExportChoice}>
              <Download color="black" size={25} />
            </span>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
