import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const SettingsPanel = ({ onClose }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    gesturesEnabled: true,
    toggleKey: 'F2',
  });

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('erudaInjectorSettings') || '{}');
    setSettings(prev => ({ ...prev, ...savedSettings }));
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('erudaInjectorSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="gesturesEnabled">Enable Gestures</Label>
            <Switch
              id="gesturesEnabled"
              checked={settings.gesturesEnabled}
              onCheckedChange={(checked) => handleSettingChange('gesturesEnabled', checked)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toggleKey">Toggle Key</Label>
            <Input
              id="toggleKey"
              value={settings.toggleKey}
              onChange={(e) => handleSettingChange('toggleKey', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;