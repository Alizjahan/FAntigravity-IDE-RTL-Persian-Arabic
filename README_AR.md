# دليل إضافة FAntigravity IDE RTL (Persian & Arabic)

إضافة **FAntigravity IDE** هي الأداة الرسمية لتفعيل المحاذاة الذكية من اليمين إلى اليسار (RTL) وضبط الخطوط العربية والفارسية بدقة فائقة، **حصرياً وداخل صندوق محادثة الذكاء الاصطناعي (AI Chat)** في بيئة **Antigravity IDE** ومحررات كود المبنية على VS Code.

---

## 🎯 عزل تام لصندوق المحادثة (Chat-Only Isolation)

تتميز الإضافة بتصميم جراحي دقيق عبر CSS Engine يضمن عدم المساس ببقية أجزاء المحرر:

- **الأجزاء التي تشملها الإضافة**:
  - رسائل المستخدم في المحادثة (User Prompts)
  - ردود المساعد الذكي (AI Assistant Responses)
  - حقل إدخال الرسائل (Chat Input Box)
  - العناوين، الفقرات، القوائم والاقتباسات داخل المحادثة

- **الأجزاء التي تبقى يسار-إلى-يمين (LTR) بدون أي تغيير**:
  - محرر الكود البرمجي الرئيسي (Monaco Code Editor)
  - علامات التبويب وشريط العناوين (Tabs & Titlebar)
  - الطرفية المدمجة (Integrated Terminal)
  - شجرة الملفات والشريط الجانبي (Explorer & Sidebar)
  - كتل الأكواد البرمجية (`pre` و `code`) داخل ردود المحادثة

---

## ✨ الميزات الرئيسية

- **خطوط مدمجة تعمل دون اتصال بالإنترنت (Offline Fonts)**:
  - **خط دبي (Dubai Font)**: خط عصري أنيق ومثالي للغتين العربية والفارسية مدمج محلياً بالكامل.
  - **خط وزير متن (Vazirmatn Variable)**: خط فارسي وعربي عالي الوضوح مدمج بصيغة WOFF2.
  - **الخطوط المخصصة**: إمكانية استخدام أي خط مثبت على نظام التشغيل (مثل Traditional Arabic, Amiri, Cairo, Segoe UI...).
- **حماية الأكواد البرمجية**: كتل الشيفرات البرمجية تبقى دائماً بالاتجاه الطبيعي من اليسار لليمين وبخط Monospace البرمجي.
- **تخصيص خط النصوص الإنجليزية بنطاق Unicode مستقل**:
  - تحديد خط خاص للكلمات الإنجليزية دون التأثير إطلاقاً على الحروف العربية أو الفارسية.
- **تخصيص خط الأكواد البرمجية (Code Font)**:
  - إمكانية تحديد خط برمجي خاص لكتل الأكواد داخل المحادثة.
- **وضع المحاذاة الإجبارية لليمين (Force RTL)**:
  - إمكانية إجبار اتجاه النص لليمين حتى للفقرات التي تبدأ برموز أو كلمات إنجليزية.
- **واجهة مستخدم ثلاثية اللغات (عربي - فارسي - إنجليزي)**:
  - لوحة تحكم أنيقة في الشريط الجانبي مع إمكانية التبديل الفوري بين اللغات الثلاث بضغطة زر.
- **إصلاح زر @ في لوحة المفاتيح الفارسية والعربية**:
  - معالجة تلقائية لاختصار `Shift + 2` لضمان كتابة رمز `@` دون مشاكل.
- **أمان كامل ونسخ احتياطي تلقائي**:
  - حفظ نسخة احتياطية بصيغة `.bak` قبل أي تعديل لضمان إمكانية التراجع بنقرة واحدة.

---

## 🚀 طرق التثبيت

### الطريقة الأولى: عبر متجر الإضافات (Extensions)
1. داخل Antigravity IDE، اضغط على `Ctrl + Shift + X` (أو `Cmd + Shift + X` على Mac).
2. ابحث عن **FAntigravity IDE RTL (Persian & Arabic)**.
3. اضغط على **Install** ثم أعد تشغيل النافذة (Reload Window).

### الطريقة الثانية: التثبيت اليدوي عبر ملف VSIX
1. حمّل ملف الحزمة `fantigravity-ide-1.0.0.vsix`.
2. من قائمة الإضافات (Extensions)، اضغط على القائمة (···) في الأعلى واختر **Install from VSIX...**.
3. حدد الملف ثم أعد تشغيل النافذة بعد اكتمال التثبيت.

---

## ⚙️ الإعدادات المتاحة (Settings)

يمكنك الوصول إليها بالضغط على `Ctrl + ,` والبحث عن `FAntigravity`:

| الإعداد | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- |
| `fantigravity.chat.enabled` | تفعيل أو تعطيل محاذاة RTL لصندوق المحادثة | `true` |
| `fantigravity.chat.fontFamily` | اختيار الخط (Dubai, Vazirmatn, System, Custom) | `Dubai` |
| `fantigravity.chat.customFontFamily` | اسم الخط العربي المخصص المثبت على نظامك | `""` |
| `fantigravity.chat.englishFontFamily` | خط الكلمات الإنجليزية المستقل | `""` |
| `fantigravity.chat.codeFontFamily` | خط كتل الأكواد البرمجية | `""` |
| `fantigravity.chat.fontSize` | حجم الخط (0 يعني الاعتماد على حجم الثيم) | `0` |
| `fantigravity.chat.lineHeight` | تباعد الأسطر (مثالي للقراءة العربية) | `1.75` |
| `fantigravity.chat.forceRtl` | فرض اتجاه اليمين لجميع النصوص | `false` |
| `fantigravity.chat.fixPersianAt` | تصحيح زر Shift + 2 لكتابة @ | `true` |

---

## ⌨️ الأوامر السريعة (Command Palette)

بالضغط على `Ctrl + Shift + P` أو `Cmd + Shift + P`:

- **FAntigravity IDE: Toggle Persian/Arabic RTL for AI Chat**
- **FAntigravity IDE: Enable Persian/Arabic RTL for AI Chat**
- **FAntigravity IDE: Disable Persian/Arabic RTL for AI Chat**
- **FAntigravity IDE: Select Persian/Arabic Font for AI Chat**
- **FAntigravity IDE: Check Installation Status**
- **FAntigravity IDE: Reload Window**

---

## 👨‍💻 المطور

تم التطوير بواسطة **عليرضا جهانبخش (Aliz)**
- غيت هاب: [https://github.com/Alizjahan](https://github.com/Alizjahan)
- تيليجرام: [https://t.me/Alizjahan](https://t.me/Alizjahan)

---

## 📄 الترخيص

هذا المشروع مرخص بموجب رخصة [MIT License](LICENSE).
