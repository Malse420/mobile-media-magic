import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const GestureHandler = ({ onSwipeUp, onSwipeDown, onLongPress }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const { toast } = useToast();

  const minSwipeDistance = 50;

  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientY);
      
      const timer = setTimeout(() => {
        onLongPress();
        toast({
          title: "Long Press Detected",
          description: "Long press action triggered.",
        });
      }, 500);
      setLongPressTimer(timer);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      clearTimeout(longPressTimer);
      
      const distance = touchStart - touchEnd;
      const isUpSwipe = distance > minSwipeDistance;
      const isDownSwipe = distance < -minSwipeDistance;
      
      if (isUpSwipe) {
        onSwipeUp();
        toast({
          title: "Swipe Up Detected",
          description: "Swipe up action triggered.",
        });
      }
      
      if (isDownSwipe) {
        onSwipeDown();
        toast({
          title: "Swipe Down Detected",
          description: "Swipe down action triggered.",
        });
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, touchEnd, onSwipeUp, onSwipeDown, onLongPress, toast, longPressTimer]);

  return null;
};

export default GestureHandler;