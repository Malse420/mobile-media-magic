import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const ElementPicker = () => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleElementClick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const element = event.target;
      setSelectedElements(prev => {
        const newSelection = prev.includes(element)
          ? prev.filter(el => el !== element)
          : [...prev, element];
        
        toast({
          title: newSelection.includes(element) ? "Element Selected" : "Element Deselected",
          description: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}`,
        });

        return newSelection;
      });
    };

    const handleElementHover = (event) => {
      setHoveredElement(event.target);
    };

    const handleElementLeave = () => {
      setHoveredElement(null);
    };

    document.body.addEventListener('click', handleElementClick, true);
    document.body.addEventListener('mouseover', handleElementHover, true);
    document.body.addEventListener('mouseout', handleElementLeave, true);

    return () => {
      document.body.removeEventListener('click', handleElementClick, true);
      document.body.removeEventListener('mouseover', handleElementHover, true);
      document.body.removeEventListener('mouseout', handleElementLeave, true);
    };
  }, [toast]);

  useEffect(() => {
    selectedElements.forEach(el => {
      el.style.outline = '2px solid blue';
    });

    if (hoveredElement && !selectedElements.includes(hoveredElement)) {
      hoveredElement.style.outline = '2px solid red';
    }

    return () => {
      selectedElements.forEach(el => {
        el.style.outline = '';
      });
      if (hoveredElement) {
        hoveredElement.style.outline = '';
      }
    };
  }, [selectedElements, hoveredElement]);

  return null;
};

export default ElementPicker;