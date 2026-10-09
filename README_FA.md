# راهنمای افزونه FAntigravity IDE RTL (Persian & Arabic)

افزونه **FAntigravity IDE** جهت فعال‌سازی قابلیت راست‌به‌چپ (RTL) هوشمند، چیدمان متن دوجهته و تایپوگرافی استاندارد فارسی و عربی به صورت **کاملاً اختصاصی برای پنل چت هوش مصنوعی (AI Chat)** در محیط Antigravity IDE و محیط‌های مبتنی بر VS Code توسعه یافته است.

[English Documentation](./README.md) | [راهنمای فارسی](./README_FA.md) | [الدليل العربي](./README_AR.md)

---

## 🎯 تمرکز تخصصی بر باکس چت (Chat Only)

یکی از مشکلات بزرگ پچ‌های سراسری، تغییر ناخواسته فونت ادیتور کد، تب‌ها یا ترمینال است. افزونه FAntigravity IDE با هدف حل این موضوع ساخته شده و دامنه عملکرد آن منحصراً به باکس چت محدود است:

- **بخش‌های تحت پوشش افزونه**:
  - پیام‌های کاربر در چت (User Messages)
  - پاسخ‌های دستیار هوش مصنوعی (AI Responses)
  - کادر ورود متن و پرامپت (Chat Input Box)
  - عنوان‌ها، پاراگراف‌ها، نقل‌قول‌ها و لیست‌های درون چت

- **بخش‌هایی که کاملاً بدون تغییر و استاندارد (LTR) باقی می‌مانند**:
  - ویرایشگر اصلی کد (Monaco Code Editor)
  - تب‌های فایل‌ها و نوار عنوان
  - ترمینال یکپارچه (Integrated Terminal)
  - درخت فایل‌ها و سایدبار
  - بلوک‌های کد (`pre` و `code`) درون متن‌های چت

---

## ✨ قابلیت‌های کلیدی

- **فونت‌های تعبیه‌شده آفلاین (Offline Fonts)**:
  - **فونت دبی (Dubai Font)**: فونت رسمی، مدرن و خوانا برای متون فارسی و عربی به صورت کاملاً آفلاین و بهینه.
  - **فونت متغیر وزیرمتن (Vazirmatn Variable)**: فونت استاندارد و دقیق تعبیه‌شده در بسته افزونه با فرمت WOFF2.
  - **پشتیبانی از فونت‌های سیستمی**: امکان انتخاب فونت‌های نصب‌شده روی سیستم‌عامل (ایران‌یکان، بی نازنین، تاهوما و ...).
- **جداسازی قلم انگلیسی با یونیکد رنج (Unicode Range)**:
  - اعمال فونت انگلیسی دلخواه بدون اینکه کوچکترین تداخلی با حروف فارسی یا عربی ایجاد کند.
- **تغییر قلم بلوک‌های کد (Code Font)**:
  - تنظیم فونت اختصاصی برای قطعه کدهای درون چت.
- **راست‌چین اجباری (Force RTL)**:
  - امکان اعمال راست‌چین برای تمامی پیام‌ها حتی اگر با واژه انگلیسی، شماره یا نماد شروع شده باشند.
- **رابط کاربری ۳ زبانه (فارسی | عربی | انگلیسی)**:
  - پنل تنظیمات گرافیکی زیبا در نوار کناری (Sidebar) با قابلیت جابجایی زبان با یک کلیک.
- **حفظ ۱۰۰ درصدی کدهای برنامه‌نویسی**: بلوک‌های کد در چت به صورت استاندارد چپ‌چین با فونت مونواسپیس نمایش داده می‌شوند.
- **اصلاح کلید @ در صفحه کلید فارسی**: تبدیل خودکار ترکیب `Shift + 2` به کاراکتر `@` درون کادر چت.
- **دسترسی سریع از Status Bar**: آیکون وضعیت در نوار پایین پنجره برای دسترسی آنی به تنظیمات و تغییر فونت.
- **امنیت کامل و بدون دستکاری دائمی**: تهیه خودکار نسخه پشتیبان `.bak` پیش از هرگونه تغییر با امکان بازگشت کامل.

---

## 🚀 روش‌های نصب

### روش اول: از طریق بخش افزونه‌های برنامه (Extensions)
۱. در Antigravity IDE کلیدهای `Ctrl + Shift + X` (یا در مک `Cmd + Shift + X`) را بفشارید.
۲. عبارت **FAntigravity IDE RTL** را جستجو نمایید.
۳. روی دکمه **Install** کلیک کرده و سپس پنجره را Reload نمایید.

### روش دوم: نصب آفلاین از طریق بسته VSIX
۱. فایل `fantigravity-ide-1.0.0.vsix` را تهیه کنید.
۲. در بخش Extensions منوی سه نقطه بالا را باز کرده و گزینه **Install from VSIX...** را انتخاب نمایید.
۳. پس از اتمام نصب، پنجره را Reload نمایید.

---

## ⚙️ تنظیمات در Settings

از طریق تنظیمات نرم‌افزار (`Ctrl + ,` یا `Cmd + ,`) و جستجوی عبارت `FAntigravity`:

| تنظیم | توضیحات | مقدار پیش‌فرض |
| :--- | :--- | :--- |
| `fantigravity.chat.enabled` | فعال یا غیرفعال‌سازی حالت RTL برای چت | `true` |
| `fantigravity.chat.fontFamily` | انتخاب فونت چت (Dubai, Vazirmatn, System, Custom) | `Dubai` |
| `fantigravity.chat.customFontFamily` | نام فونت دلخواه نصب‌شده روی سیستم | `""` |
| `fantigravity.chat.englishFontFamily` | نام فونت مجزا برای کلمات انگلیسی | `""` |
| `fantigravity.chat.codeFontFamily` | نام فونت برای قطعه کدهای درون چت | `""` |
| `fantigravity.chat.fontSize` | اندازه قلم متون چت (مقدار 0 یعنی ارث‌بری از تم) | `0` |
| `fantigravity.chat.lineHeight` | فاصله بین خطوط (پیش‌فرض: 1.75 برای خوانایی بهینه) | `1.75` |
| `fantigravity.chat.forceRtl` | اجبار به راست‌چین تمام متون حتی با شروع انگلیسی | `false` |
| `fantigravity.chat.fixPersianAt` | اصلاح خودکار کلید Shift + 2 برای درج علامت @ | `true` |

---

## ⌨️ دستورات در Command Palette

با فشردن کلیدهای `Ctrl + Shift + P` یا `Cmd + Shift + P` دستورات زیر در دسترس هستند:

- **FAntigravity IDE: Toggle Persian/Arabic RTL for AI Chat**
- **FAntigravity IDE: Enable Persian/Arabic RTL for AI Chat**
- **FAntigravity IDE: Disable Persian/Arabic RTL for AI Chat**
- **FAntigravity IDE: Select Persian/Arabic Font for AI Chat**
- **FAntigravity IDE: Check Installation Status**
- **FAntigravity IDE: Reload Window**

---

## 👨‍💻 توسعه‌دهنده

توسعه‌یافته توسط **Aliz ([@Alizjahan](https://github.com/Alizjahan))**
- گیت‌هاب: [https://github.com/Alizjahan](https://github.com/Alizjahan)
- تلگرام: [https://t.me/Alizjahan](https://t.me/Alizjahan)

---

## 📄 مجوز

این پروژه تحت مجوز [MIT License](LICENSE) منتشر شده است.
