
import { useState } from "react";
import { 
  Eye, 
  Type, 
  Moon, 
  Languages, 
  VolumeX, 
  Volume2,
  Mic
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AccessibilitySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccessibilitySettings({ open, onOpenChange }: AccessibilitySettingsProps) {
  const [fontSize, setFontSize] = useState([100]);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [voiceNavigation, setVoiceNavigation] = useState(false);
  const [language, setLanguage] = useState("english");
  const [colorMode, setColorMode] = useState("default");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
          <DialogDescription>
            Customize the app to meet your accessibility needs
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="audio">Audio & Speech</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="text-base">Font Size ({fontSize}%)</Label>
              </div>
              <Slider 
                id="font-size"
                min={75} 
                max={200} 
                step={5}
                value={fontSize}
                onValueChange={setFontSize}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller</span>
                <span>Default</span>
                <span>Larger</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast" className="text-base">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Improves visibility with higher contrast colors
                </p>
              </div>
              <Switch 
                id="high-contrast" 
                checked={highContrast} 
                onCheckedChange={setHighContrast}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Color Theme</Label>
              <ToggleGroup 
                type="single" 
                variant="outline"
                value={colorMode}
                onValueChange={(value) => value && setColorMode(value)}
                className="grid grid-cols-3 gap-2"
              >
                <ToggleGroupItem value="default" className="flex flex-col gap-1 h-20">
                  <div className="w-full h-8 bg-white border rounded-sm"></div>
                  <span className="text-xs">Default</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="dark" className="flex flex-col gap-1 h-20">
                  <div className="w-full h-8 bg-gray-800 border rounded-sm"></div>
                  <span className="text-xs">Dark</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="colorblind" className="flex flex-col gap-1 h-20">
                  <div className="w-full h-8 bg-blue-100 border rounded-sm"></div>
                  <span className="text-xs">Colorblind</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="screen-reader" className="text-base">Screen Reader Compatibility</Label>
                <p className="text-sm text-muted-foreground">
                  Optimize for screen readers like VoiceOver or TalkBack
                </p>
              </div>
              <Switch 
                id="screen-reader" 
                checked={screenReader} 
                onCheckedChange={setScreenReader}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="voice-navigation" className="text-base">Voice Navigation</Label>
                <p className="text-sm text-muted-foreground">
                  Control the app using voice commands
                </p>
              </div>
              <Switch 
                id="voice-navigation" 
                checked={voiceNavigation} 
                onCheckedChange={setVoiceNavigation}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notification-type" className="text-base">Notification Type</Label>
              <Select defaultValue="both">
                <SelectTrigger id="notification-type">
                  <SelectValue placeholder="Select notification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sound">Sound Only</SelectItem>
                  <SelectItem value="visual">Visual Only</SelectItem>
                  <SelectItem value="both">Sound & Visual</SelectItem>
                  <SelectItem value="vibration">Vibration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="language" className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="app-language" className="text-base">App Language</Label>
              <Select 
                value={language} 
                onValueChange={setLanguage}
              >
                <SelectTrigger id="app-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Español (Spanish)</SelectItem>
                  <SelectItem value="french">Français (French)</SelectItem>
                  <SelectItem value="mandarin">中文 (Mandarin)</SelectItem>
                  <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="content-translation" className="text-base">Translate User Content</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically translate user-generated content
                </p>
              </div>
              <Switch id="content-translation" defaultChecked />
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Changing the language will translate all UI elements and system content. User-generated content may be translated automatically if the option is enabled.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <div className="space-x-2">
            <Button variant="secondary" onClick={() => {
              setFontSize([100]);
              setHighContrast(false);
              setScreenReader(false);
              setVoiceNavigation(false);
              setLanguage("english");
              setColorMode("default");
            }}>
              Reset to Defaults
            </Button>
            <Button>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
