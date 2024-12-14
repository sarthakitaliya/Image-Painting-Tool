
---

# **Image Painting Tool**

## **Overview**

The **Image Painting Tool** is a web-based application that allows users to upload images, draw custom masks, and export the edited files. Built with **React**, **Fabric.js**, and modern libraries, this tool delivers an intuitive, interactive experience for image editing tasks.

---

## **Features**

### **1. Image Upload**
- Accepts JPEG and PNG formats.
- Restricts file size to a maximum of 5MB to maintain performance.
- Automatically displays the uploaded image on the canvas for editing.

### **2. Mask Drawing**
- Draw masks on the uploaded image using a customizable brush.
- The mask uses a **black background** and a **white drawing area** for clear contrast.

### **3. Brush Controls**
- Dynamically adjust the brush size (range: **1px** to **50px**) using `+` and `-` icons.
- Default brush size is **15px**.

### **4. Mask Export Options**
- Export the **mask image with the original image**.
- Export only the **mask image** (without the original image).

### **5. Clear Canvas**
- Reset the canvas to a blank state while retaining the uploaded image for further edits.

### **6. Additional Features**
- **Toast Notifications**: Provides real-time feedback for actions such as invalid uploads, successful downloads, or errors, powered by **react-hot-toast**.
- **Responsive Design**: Automatically adjusts canvas dimensions on window resize for an optimal user experience.
- **Interactive UI Icons**: Easily recognizable icons for actions like uploading, clearing the canvas, resizing the brush, and exporting images (provided by **lucide-react**).


---

## **Installation**

### **Requirements**
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### **Setup Steps**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd image-painting-tool
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the app in your browser.

---

## **Challenges and Solutions**

### **1. Canvas Resizing**
- **Issue**: Resizing the canvas dynamically while preserving the aspect ratio of the uploaded image.  
- **Solution**: Utilized **fabric.js**'s scaling features to scale images proportionally and center them within the canvas.

### **2. File Validation**
- **Issue**: Validating file type and size for uploaded images.  
- **Solution**: Added checks for file types (`PNG`, `JPEG`) and sizes (≤ 5MB) with clear **toast notifications** for user feedback.

### **3. Export Functionality**
- **Issue**: Exporting the canvas as a standalone mask or a mask combined with the uploaded image.  
- **Solution**: Implemented separate export options using **fabric.js** to control image visibility during the export process.


## **Acknowledgments**

All challenges were solved by leveraging **web resources** and **AI tools**, such as **documentation** and **programming assistants**, ensuring efficient problem-solving throughout the project.