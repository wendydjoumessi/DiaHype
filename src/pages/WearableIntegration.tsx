
import { useState } from "react";
import { Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const wearableDevices = [
  {
    id: "fitbit",
    name: "Fitbit",
    logo: "/placeholder.svg",
    description: "Track activity, exercise, sleep, weight and more",
    isConnected: false,
  },
  {
    id: "apple-watch",
    name: "Apple Watch",
    logo: "/placeholder.svg",
    description: "Monitor your health metrics and track your fitness goals",
    isConnected: true,
  },
  {
    id: "garmin",
    name: "Garmin",
    logo: "/placeholder.svg",
    description: "Advanced metrics for health and fitness tracking",
    isConnected: false,
  },
  {
    id: "samsung-health",
    name: "Samsung Health",
    logo: "/placeholder.svg",
    description: "Track your activity, nutrition, sleep, and stress",
    isConnected: false,
  },
  {
    id: "glucose-monitor",
    name: "Continuous Glucose Monitor",
    logo: "/placeholder.svg",
    description: "Real-time glucose monitoring integration",
    isConnected: true,
  },
  {
    id: "blood-pressure",
    name: "Smart Blood Pressure Monitor",
    logo: "/placeholder.svg",
    description: "Automatic syncing of blood pressure readings",
    isConnected: false,
  },
];

export default function WearableIntegration() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("connected");
  const [connectedDevices, setConnectedDevices] = useState(
    wearableDevices.filter(device => device.isConnected)
  );
  const [availableDevices, setAvailableDevices] = useState(
    wearableDevices.filter(device => !device.isConnected)
  );

  const handleConnect = (deviceId: string) => {
    const deviceToConnect = availableDevices.find(d => d.id === deviceId);
    if (deviceToConnect) {
      setAvailableDevices(availableDevices.filter(d => d.id !== deviceId));
      setConnectedDevices([...connectedDevices, {...deviceToConnect, isConnected: true}]);
      
      toast({
        title: "Device Connected",
        description: `Your ${deviceToConnect.name} has been successfully connected.`,
      });
    }
  };

  const handleDisconnect = (deviceId: string) => {
    const deviceToDisconnect = connectedDevices.find(d => d.id === deviceId);
    if (deviceToDisconnect) {
      setConnectedDevices(connectedDevices.filter(d => d.id !== deviceId));
      setAvailableDevices([...availableDevices, {...deviceToDisconnect, isConnected: false}]);
      
      toast({
        title: "Device Disconnected",
        description: `Your ${deviceToDisconnect.name} has been disconnected.`,
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold text-health-dark mb-2">Wearable Integration</h1>
          <p className="text-muted-foreground">
            Connect your wearable devices to sync health data automatically
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="connected">Connected Devices</TabsTrigger>
            <TabsTrigger value="available">Available Devices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connected">
            {connectedDevices.length === 0 ? (
              <div className="text-center py-12">
                <Layout className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Connected Devices</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't connected any wearable devices yet
                </p>
                <Button onClick={() => setActiveTab("available")}>
                  Browse Available Devices
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connectedDevices.map(device => (
                  <Card key={device.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{device.name}</CardTitle>
                      <div className="h-10 w-10 rounded-full bg-green-100 p-2">
                        <img src={device.logo} alt={device.name} className="h-full w-full" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{device.description}</p>
                      <div className="mt-4 flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium text-green-500">Connected</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleDisconnect(device.id)}
                      >
                        Disconnect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available">
            {availableDevices.length === 0 ? (
              <div className="text-center py-12">
                <Layout className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Available Devices</h3>
                <p className="text-muted-foreground">
                  You've connected all available wearable devices
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableDevices.map(device => (
                  <Card key={device.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{device.name}</CardTitle>
                      <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                        <img src={device.logo} alt={device.name} className="h-full w-full" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{device.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-health-primary hover:bg-health-accent" 
                        onClick={() => handleConnect(device.id)}
                      >
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
