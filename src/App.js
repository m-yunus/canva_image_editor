import logo from './logo.svg';
import './App.css';
import EditorCanvas from './EditorCanvas';
import { useEffect, useRef, useState } from 'react';
import { Canvas, PencilBrush, Image } from 'fabric';
import Toolbox from './Toolbox';

function App() {
  const imageList = [
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/21981329-648b-4b85-b531-ef66a1d8a261/AIR+ZOOM+PEGASUS+41+PQ.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1f31a5fd-9f59-4331-8bd1-c8fabe073b4e/NIKE+ZOOM+VOMERO+5.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2c5fca2b-8444-4de1-8b26-befa5cdca6fb/JORDAN+LUKA+3+PF.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ded7c724-13e3-4cd9-8211-182e5e5d11d4/NIKE+REACTX+INFINITY+RUN+4.png',
  ];
  
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, { backgroundColor: 'white' });
    canvas.setDimensions({ width: 1000, height: 500 });
    const brush = new PencilBrush(canvas);
    brush.color = 'black';
    brush.width = 4;
    canvas.freeDrawingBrush = brush;
    setCanvas(canvas);

    return () => canvas.dispose();
  }, [canvasRef, setCanvas]);

  const addImageFromURL = (url) => {
    Image.fromURL(url).then((image) => {
      image.scale(0.5);
      image.set({
        selectable: true,
        hasControls: true,
        hasBorders: true
      });
      canvas.add(image);
      canvas.centerObject(image);
      canvas.setActiveObject(image);
      canvas.renderAll();
    });
  };

  const handleImageClick = (imgSrc) => {
    addImageFromURL(imgSrc);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h3 className='text-lg tracking-widest pl-2'>Image List</h3>
        {imageList.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`img-${idx}`}
            className="sidebar-image"
            onClick={() => handleImageClick(imgSrc)} // Call the method to add the image from URL
          />
        ))}
      </div>

      <div className="canvas-container">
        <h3 className='text-lg tracking-widest font-bold pl-2 text-center'>CANVAS</h3>
        <div className="canvas px-6">
          <Toolbox 
            canvas={canvas} 
            currentFilter={currentFilter} 
            setCurrentFilter={setCurrentFilter}
            addImageFromURL={addImageFromURL} // Pass the function as a prop
          />
          <EditorCanvas 
            ref={canvasRef} 
            canvas={canvas} 
            setCurrentFilter={setCurrentFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
