

# ربط التطبيق بالسيرفر الحقيقي

## ما سيتم تنفيذه

### 1. إضافة الـ Secrets
سيتم طلب إدخال قيمتين:
- **VPS_AGENT_URL**: عنوان السيرفر مع البورت (مثال: `http://YOUR-IP:9111`)
- **VPS_API_KEY**: مفتاح الوصول الذي حددته عند تشغيل الـ Agent

هذه القيم ستُخزن بشكل آمن ولن تظهر في الكود.

### 2. تحديث الكود للاتصال الحقيقي
سيتم تعديل ملف `src/hooks/useVpsData.ts` لاستبدال البيانات الوهمية (mock data) باستدعاء حقيقي للـ backend function `vps-status` التي تتصل بالسيرفر.

### 3. نشر الـ Edge Function
سيتم نشر دالة `vps-status` التي تعمل كوسيط آمن بين التطبيق والسيرفر.

---

## التفاصيل التقنية

### الملفات المتأثرة
- `src/hooks/useVpsData.ts` - استبدال mock data باستدعاء `supabase.functions.invoke('vps-status')`

### تدفق البيانات
```text
المتصفح --> Edge Function (vps-status) --> Agent على السيرفر (port 9111)
```

