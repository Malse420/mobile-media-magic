import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const ElementPicker = () => {
  const [selectedElements, setSelectedElements] = useState([]);
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

    document.body.addEventListener('click', handleElementClick, true);

    return () => {
      document.body.removeEventListener('click', handleElementClick, true);
    };
  }, [toast]);

  useEffect(() => {
    selectedElements.forEach(el => {
      el.style.outline = '2px solid blue';
    });

    return () => {
      selectedElements.forEach(el => {
        el.style.outline = '';
      });
    };
  }, [selectedElements]);

  return null;
};

export default ElementPicker;