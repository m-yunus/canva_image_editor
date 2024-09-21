import { useEffect, useState } from 'react';
import { Image, filters } from 'fabric';
import { AiOutlinePicture, AiOutlineDownload } from 'react-icons/ai';
import { MdOutlineModeEditOutline, MdDeleteOutline } from 'react-icons/md';

const Toolbox = ({ canvas, currentFilter, setCurrentFilter }) => {
  const [drawingMode, setDrawingMode] = useState(false);

  useEffect(() => {
    if (!canvas || !canvas.getActiveObject() || !canvas.getActiveObject().isType('image')) return;

    function getSelectedFilter() {
      switch (currentFilter) {
        case 'sepia':
          return new filters.Sepia();
        case 'vintage':
          return new filters.Vintage();
        case 'invert':
          return new filters.Invert();
        case 'polaroid':
          return new filters.Polaroid();
        case 'grayscale':
          return new filters.Grayscale();
        default:
          return null;
      }
    }

    const filter = getSelectedFilter();
    const img = canvas.getActiveObject();
    img.filters = filter ? [filter] : [];
    img.applyFilters();
    canvas.renderAll();
  }, [currentFilter, canvas]);

  // New method to add an image from a URL
  function addImageFromURL(url) {
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
  }

  function toggleDrawingMode() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setDrawingMode(canvas.isDrawingMode);
  }

  
  function clearAll() {
    if (window.confirm('Are you sure you want to clear all?')) {
      canvas.remove(...canvas.getObjects());
    }
  }

  return (
    <div className="toolbox">
      <button title="Drawing mode" onClick={toggleDrawingMode} className={drawingMode ? 'active' : ''}>
        <MdOutlineModeEditOutline   size={24} />
      </button>
      <button title="Clear all" onClick={clearAll}>
        <MdDeleteOutline size={24} />
      </button>
    
    </div>
  );
};

export default Toolbox;
