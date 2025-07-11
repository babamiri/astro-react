# فرم ویزاردی محاسبه بیمه

این پکیج یک فرم ویزاردی کامل برای محاسبه آنلاین بیمه است که با React، TypeScript، Vite و Tailwind CSS ساخته شده است.

## 🚀 ویژگی‌های کلیدی

### ✨ فرم ویزاردی هوشمند
- **بدون دکمه بازگشت/ادامه**: انتخاب هر گزینه به طور خودکار به مرحله بعد منتقل می‌شود
- **انتخاب‌های قابل حذف**: تمام انتخاب‌ها در بالای صفحه نمایش داده می‌شوند و با کلیک قابل حذف هستند
- **منطق شرطی**: مراحل بر اساس پاسخ‌های قبلی نمایش داده می‌شوند یا رد می‌شوند
- **پشتیبانی از لمس**: بهینه‌سازی شده برای دستگاه‌های لمسی با قابلیت swipe

### 🎯 انواع بیمه پشتیبانی شده

1. **بیمه خودرو** - محاسبه حق بیمه خودرو با تمام عوامل مؤثر
2. **بیمه آتش‌سوزی** - محاسبه بیمه آتش‌سوزی ساختمان و محتویات
3. **بیمه مسافرتی** - محاسبه بیمه مسافرت داخلی و خارجی
4. **بیمه لوازم الکترونیکی** - محاسبه بیمه گوشی، لپ‌تاپ و سایر لوازم
5. **بیمه مسئولیت** - محاسبه بیمه مسئولیت مدنی و حرفه‌ای
6. **بیمه مالپرکتیس پزشکی** - محاسبه بیمه مسئولیت پزشکان

## 📦 نصب

```bash
pnpm install @astro-react/ui-wizard
```

## 🎨 استفاده

### استفاده ساده

```tsx
import { InsuranceSelector, Wizard } from '@astro-react/ui-wizard';

function App() {
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [configFile, setConfigFile] = useState('');

  return (
    <div>
      {selectedInsurance ? (
        <Wizard
          insuranceType="بیمه خودرو"
          configFile="insuranceWizard.json"
          onBack={() => setSelectedInsurance(null)}
        />
      ) : (
        <InsuranceSelector onSelect={setSelectedInsurance} />
      )}
    </div>
  );
}
```

### کامپوننت‌های موجود

- `InsuranceSelector`: انتخابگر نوع بیمه
- `Wizard`: کامپوننت اصلی ویزارد
- `StepRenderer`: رندر کننده مراحل مختلف
- `SelectedItems`: نمایش انتخاب‌های کاربر
- `Result`: نمایش نتیجه نهایی

## 🔧 تنظیمات

### فایل‌های JSON پیکربندی

هر نوع بیمه دارای فایل JSON مخصوص خود است:

- `insuranceWizard.json` - بیمه خودرو
- `fireInsurance.json` - بیمه آتش‌سوزی
- `travelInsurance.json` - بیمه مسافرتی
- `electronicsInsurance.json` - بیمه لوازم الکترونیکی
- `liabilityInsurance.json` - بیمه مسئولیت
- `medicalInsurance.json` - بیمه مالپرکتیس پزشکی

### نوع‌های مختلف سوال:
- `single_select`: انتخاب یکی از گزینه‌ها
- `multiple_select`: انتخاب چندین گزینه
- `yes_no`: سوال بله/خیر
- `date`: انتخاب تاریخ
- `result`: نمایش نتیجه

## 🎨 فناوری‌های استفاده شده

- **React 19**: کتابخانه اصلی UI
- **TypeScript**: برای type safety
- **Vite**: ابزار build سریع
- **Tailwind CSS**: framework CSS با پشتیبانی RTL
- **Design Tokens**: سیستم طراحی یکپارچه

## 🚀 نحوه اجرا

### پیش‌نیازها
- Node.js (نسخه 16 یا بالاتر)
- pnpm

### دستورات

```bash
# اجرای سرور توسعه
pnpm dev

# ساخت نسخه تولید
pnpm build

# بررسی کد
pnpm typecheck

# مشاهده پیش‌نمایش
pnpm preview
```

## 📱 ویژگی‌های پیشرفته

- **Responsive Design**: سازگار با تمام اندازه‌های صفحه
- **RTL Support**: پشتیبانی کامل از راست به چپ
- **Touch Optimized**: بهینه‌سازی شده برای دستگاه‌های لمسی
- **Swipe Navigation**: امکان جابجایی با swipe در موبایل
- **Haptic Feedback**: بازخورد لمسی در دستگاه‌های پشتیبان
- **Progressive Enhancement**: کارکرد بدون JavaScript
- **Accessibility**: پشتیبانی از کیبورد و screen readers

## 🔄 سفارشی‌سازی

### افزودن نوع بیمه جدید

1. فایل JSON جدید در `src/data/` ایجاد کنید
2. نوع بیمه را به `insuranceTypes.json` اضافه کنید
3. فرمول محاسبه را در فایل JSON تعریف کنید

### تغییر ظاهر

کلاس‌های Tailwind CSS را در کامپوننت‌ها تغییر دهید یا از design tokens استفاده کنید.

## 🤝 مشارکت

برای مشارکت در پروژه:
1. پروژه را Fork کنید
2. branch جدید بسازید
3. تغییرات را commit کنید
4. Pull Request ارسال کنید

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

---

**توسعه‌دهنده**: تیم توسعه astro-react  
**نسخه**: 0.0.1 