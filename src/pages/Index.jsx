import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Download, Maximize2 } from "lucide-react";
import ErudaInjector from '../components/ErudaInjector';
import MediaScraper from '../components/MediaScraper';
import ElementPicker from '../components/ElementPicker';
import SettingsPanel from '../components/SettingsPanel';
import GestureHandler from '../components/GestureHandler';

const Index = () => {
  const [isErudaActive, setIsErudaActive] = useState(false);
  const [isScraperActive, setIsScraperActive] = useState(false);
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('erudaInjectorSettings') || '{}');
    setIsErudaActive(savedSettings.erudaActive || false);
  }, []);

  const toggleEruda = () => {
    setIsErudaActive(!isErudaActive);
    toast({
      title: isErudaActive ? "Eruda Deactivated" : "Eruda Activated",
      description: isErudaActive ? "Developer console has been hidden." : "Developer console is now available.",
    });
  };

  const toggleScraper = () => {
    setIsScraperActive(!isScraperActive);
    toast({
      title: isScraperActive ? "Media Scraper Deactivated" : "Media Scraper Activated",
      description: isScraperActive ? "Media scraping has been disabled." : "You can now scrape media from the page.",
    });
  };

  const togglePicker = () => {
    setIsPickerActive(!isPickerActive);
    toast({
      title: isPickerActive ? "Element Picker Deactivated" : "Element Picker Activated",
      description: isPickerActive ? "Element selection has been disabled." : "You can now select elements on the page.",
    });
  };

  const handleSwipeUp = () => {
    toggleEruda();
  };

  const handleSwipeDown = () => {
    toggleScraper();
  };

  const handleLongPress = () => {
    togglePicker();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        Eruda Console Injector
      </h1>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <Toggle pressed={isErudaActive} onPressedChange={toggleEruda}>
          Eruda Console
        </Toggle>
        <Toggle pressed={isScraperActive} onPressedChange={toggleScraper}>
          Media Scraper
        </Toggle>
        <Toggle pressed={isPickerActive} onPressedChange={togglePicker}>
          Element Picker
        </Toggle>
        <Button onClick={() => setShowSettings(true)}>
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>

      {isErudaActive && <ErudaInjector />}
      {isScraperActive && <MediaScraper />}
      {isPickerActive && <ElementPicker />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      <GestureHandler
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        onLongPress={handleLongPress}
      />

      <div className="fixed bottom-4 right-4 flex gap-2">
        <Button size="icon" variant="outline" onClick={() => toast({ title: "Download", description: "Downloading selected media..." })}>
          <Download className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => toast({ title: "Fullscreen", description: "Entering fullscreen mode..." })}>
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;