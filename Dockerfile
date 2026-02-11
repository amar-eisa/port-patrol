# المرحلة الأولى: بناء التطبيق (Builder Stage)
FROM node:20-alpine as builder

WORKDIR /app

# نسخ ملفات تعريف الاعتماديات
COPY package.json package-lock.json ./

# تثبيت الاعتماديات باستخدام npm install (أكثر مرونة من npm ci)
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# استقبال متغيرات البيئة أثناء البناء (ضروري لـ Vite)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# تمرير المتغيرات للنظام ليراها التطبيق أثناء البناء
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# بناء المشروع (سينتج مجلد dist)
RUN npm run build

# المرحلة الثانية: خادمة الويب (Production Stage)
FROM nginx:alpine

# نسخ ملف إعدادات Nginx المخصص
COPY nginx.conf /etc/nginx/conf.d/default.conf

# نسخ ملفات الموقع الجاهزة من مرحلة البناء إلى مجلد Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# فتح المنفذ الداخلي للحاوية
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]