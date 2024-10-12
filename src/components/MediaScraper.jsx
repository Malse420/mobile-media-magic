import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const MediaScraper = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const scrapeMedia = () => {
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        type: 'image',
        src: img.src,
        alt: img.alt
      }));

      const videos = Array.from(document.querySelectorAll('video')).map(video => ({
        type: 'video',
        src: video.src,
        poster: video.poster
      }));

      setMediaItems([...images, ...videos]);
      toast({
        title: "Media Scraped",
        description: `Found ${images.length} images and ${videos.length} videos.`,
      });
    };

    scrapeMedia();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrapeMedia();
        }
      });
    });

    document.querySelectorAll('img, video').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [toast]);

  return (
    <div className="fixed bottom-16 left-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg overflow-auto max-h-60">
      <h3 className="text-lg font-semibold mb-2">Scraped Media ({mediaItems.length})</h3>
      <div className="grid grid-cols-3 gap-2">
        {mediaItems.map((item, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded">
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            ) : (
              <video src={item.src} poster={item.poster} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaScraper;