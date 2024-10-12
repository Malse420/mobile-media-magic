import React, { useEffect, useState, useContext } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SettingsContext } from '../contexts/SettingsContext';

const MediaScraper = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const { toast } = useToast();
  const { settings } = useContext(SettingsContext);

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

      const audios = Array.from(document.querySelectorAll('audio')).map(audio => ({
        type: 'audio',
        src: audio.src
      }));

      setMediaItems([...images, ...videos, ...(settings.includeAudio ? audios : [])]);
      toast({
        title: "Media Scraped",
        description: `Found ${images.length} images, ${videos.length} videos, and ${audios.length} audio files.`,
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

    document.querySelectorAll('img, video, audio').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [toast, settings]);

  const handleDownload = (item) => {
    // Implement download logic here
    toast({
      title: "Download Started",
      description: `Downloading ${item.type}: ${item.src}`,
    });
  };

  return (
    <div className="fixed bottom-16 left-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg overflow-auto max-h-60">
      <h3 className="text-lg font-semibold mb-2">Scraped Media ({mediaItems.length})</h3>
      <div className="grid grid-cols-3 gap-2">
        {mediaItems.map((item, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded">
            {item.type === 'image' && (
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            )}
            {item.type === 'video' && (
              <video src={item.src} poster={item.poster} className="w-full h-full object-cover" />
            )}
            {item.type === 'audio' && (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <span className="text-2xl">🎵</span>
              </div>
            )}
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-1 right-1"
              onClick={() => handleDownload(item)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaScraper;