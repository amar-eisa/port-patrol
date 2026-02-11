

# اعادة اعداد الاتصال بالسيرفر من الصفر

## الهدف
اعادة بناء نظام الاتصال بالسيرفر بالكامل باستخدام بورت **8050** واسماء جديدة مختلفة عن السابقة.

## التسمية الجديدة

| العنصر | الاسم القديم | الاسم الجديد |
|--------|-------------|-------------|
| Backend Function | `vps-status` | `server-monitor` |
| Secret (العنوان) | `VPS_AGENT_URL` | `MONITOR_HOST_URL` |
| Secret (المفتاح) | `VPS_API_KEY` | `MONITOR_ACCESS_KEY` |
| Hook | `useVpsData` | `useServerData` |

## الخطوات

### 1. انشاء Backend Function جديدة باسم `server-monitor`
- دالة جديدة في `supabase/functions/server-monitor/index.ts`
- تقرأ من secrets الجديدة `MONITOR_HOST_URL` و `MONITOR_ACCESS_KEY`
- تتصل بالسيرفر على البورت 8050 وتجلب البيانات من `/status`
- اضافة اعدادات الدالة في `config.toml`

### 2. اضافة Secrets الجديدة
- طلب ادخال `MONITOR_HOST_URL` بالصيغة الصحيحة: `http://5.189.155.145:8050`
- طلب ادخال `MONITOR_ACCESS_KEY` 'Aa123456'

### 3. تحديث Hook الاتصال
- تعديل `src/hooks/useVpsData.ts` ليستدعي الدالة الجديدة `server-monitor` بدلا من `vps-status`

### 4. اختبار الاتصال
- نشر الدالة الجديدة
- اختبار الاتصال والتاكد من وصول البيانات

## التفاصيل التقنية

### كود الدالة الجديدة (`supabase/functions/server-monitor/index.ts`)
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, ...",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const hostUrl = Deno.env.get("MONITOR_HOST_URL");
    const accessKey = Deno.env.get("MONITOR_ACCESS_KEY");

    if (!hostUrl || !accessKey) {
      return new Response(
        JSON.stringify({ error: "Monitor not configured." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const targetUrl = `${hostUrl}/status`;
    const response = await fetch(targetUrl, {
      headers: {
        "X-API-Key": accessKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(
        JSON.stringify({ error: `Agent returned ${response.status}: ${text}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Connection failed: ${error.message}` }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

### تحديث config.toml
اضافة:
```toml
[functions.server-monitor]
verify_jwt = false
```

### تحديث useVpsData.ts
تغيير استدعاء الدالة من `vps-status` الى `server-monitor`:
```typescript
const { data: result, error: fnError } = await supabase.functions.invoke('server-monitor');
```

### Secrets المطلوبة
- `MONITOR_HOST_URL`: يجب ادخالها بالصيغة `http://5.189.155.145:8050` (مع `://` بشكل صحيح)
- `MONITOR_ACCESS_KEY`: 'Aa123456'

