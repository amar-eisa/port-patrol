import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Server, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vpsUrl, setVpsUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [refreshInterval, setRefreshInterval] = useState("30");

  const handleSave = () => {
    // TODO: Save to Supabase secrets via edge function
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعدادات بنجاح",
    });
  };

  return (
    <div className="dark min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container flex items-center h-14 px-4 gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Server className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold font-mono">الإعدادات</h1>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-xl space-y-6">
        <Card className="bg-card/80 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">اتصال السيرفر</CardTitle>
            <CardDescription>أدخل بيانات الاتصال بالـ Agent المثبت على السيرفر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vps-url">عنوان الـ VPS (IP أو Domain)</Label>
              <Input
                id="vps-url"
                value={vpsUrl}
                onChange={(e) => setVpsUrl(e.target.value)}
                placeholder="https://your-vps-ip:5000"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="مفتاح الوصول للـ Agent"
                dir="ltr"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">التحديث التلقائي</CardTitle>
            <CardDescription>فترة التحديث التلقائي بالثواني</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="interval">الفترة (ثانية)</Label>
              <Input
                id="interval"
                type="number"
                min="10"
                max="300"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                dir="ltr"
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full gap-2">
          <Save className="h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </main>
    </div>
  );
};

export default SettingsPage;
