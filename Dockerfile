# المرحلة الأولى: البناء (Build Stage)
FROM node:20-alpine as builder

WORKDIR /app

# نسخ ملفات تعريف الاعتماديات
COPY package.json package-lock.json ./

# تثبيت الاعتماديات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# تعريف المتغيرات التي يحتاجها التطبيق أثناء البناء (مثل Supabase)
# ملاحظة: لا نضع القيم هنا، فقط التعريف
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# تمرير المتغيرات لبيئة العمل أثناء البناء
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# بناء المشروع
RUN npm run build

# المرحلة الثانية: التشغيل (Production Stage) باستخدام Nginx
FROM nginx:alpine

# نسخ ملف إعدادات Nginx (سنقوم بإنشائه في الخطوة التالية)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# نسخ ملفات الموقع الجاهزة من مرحلة البناء إلى مجلد Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# فتح المنفذ 80 (الداخلي)
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]