import React from 'react'
import './DownloadPopup.css'
import { X } from 'lucide-react'

const DownloadPopup = ({setExportPopup, handleExportMaskWithImage, handleExportMaskOnly}) => {
  return (
    <div className='download-popup'>
      <div className="popup-overlay" onClick={() => setExportPopup(false)}></div>
      <div className="popup-container">
        <div className="popup-header">
          <X  className="popup-close-icon" onClick={() => setExportPopup(false)} />
        </div>
        <div className="popup-options">
          <div className="popup-option">
            <p>Download Mask with Original Image</p>
            <button className="download-button" onClick={handleExportMaskWithImage}>Download</button>
          </div>
          <div className="popup-option">
            <p>Download Mask Image Only</p>
            <button className="download-button" onClick={handleExportMaskOnly}>Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPopup;
