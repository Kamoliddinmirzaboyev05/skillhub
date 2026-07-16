# ProAcademy — Master Plan

Stack qaror: Backend **NestJS** (Express emas — DI/module/guard RBAC uchun qulayroq, spec'dan chetlanish qasddan). Prisma ORM. Frontend: `student`, `mentor`, `superadmin` — 3 alohida Vite+React+TS+Tailwind app. Telegram bot: `Telegraf.js`, backend ichida yoki alohida servis (Faza 6da hal qilinadi).

Qoida: bitta faza = bitta Antigravity iteratsiyasi. Faza tugamaguncha keyingisiga o'tilmaydi. Bajarilgan band `[x]`.

## Faza 0 — Fundament
- [x] Repo scaffolding (backend NestJS, 3 frontend Vite app)
- [x] Prisma schema: User(role enum: STUDENT/MENTOR/SUPERADMIN), Course, Module, Lesson, Enrollment, Payment, Payout, Review, Category, Discussion — FK indexlar bilan
- [ ] `.env` shablon: DATABASE_URL, JWT_SECRET, BUNNY_*, TELEGRAM_BOT_TOKEN, PAYMENT_* kalitlari
- [x] JWT auth (register/login, bcrypt), RBAC guard (@Roles decorator + RolesGuard)
- [ ] Global error handling + validation pipe (class-validator)
- [ ] Refresh token oqimi (hozircha faqat access token ko'rinadi — tekshirish kerak)

## Faza 1 — Student: Marketplace (public)
- [ ] Landing page (hero, search, kategoriya pill, carousel)
- [ ] Course catalog + filter (category/price/rating/language/level) + sort
- [ ] Course detail/sales page (curriculum accordion, mentor bio, reviews)
- [ ] Checkout page (promocode, to'lov tanlash) — real to'lov Faza 5da

## Faza 2 — Student: Dashboard & Classroom
- [ ] My Learning (progress bar, filter status)
- [ ] Video player (Bunny.net signed URL) + anti-piracy watermark (ism/telefon/IP, 10-15s pozitsiya almashinuvi) + screen protection (right-click/PiP block)
- [ ] Lesson sidebar + Overview/Q&A/Notes tab
- [ ] Quiz module (MCQ, auto-grading, retake)
- [ ] Certificate (PDF, QR, verification ID)
- [ ] Profile/settings + Telegram linking kodi

## Faza 3 — Mentor: Course Builder
- [ ] Mentor analytics dashboard (revenue, students, rating, chart)
- [ ] Course list + status badge (Draft/Review/Published/Rejected)
- [ ] Multi-step builder: Basic Info → Media → Curriculum (drag-drop) → Video upload (Bunny) → Pricing/Publish (submit moderation)
- [ ] Q&A inbox (reply/pin/resolve)

## Faza 4 — Mentor: Financials
- [ ] Earnings breakdown (gross/net %), balance (available/pending)
- [ ] Payout so'rovi modal (karta/hisob)
- [ ] Payout tarixi jadval

## Faza 5 — Superadmin
- [ ] Executive dashboard (GMV, platform revenue, users, conversion)
- [ ] User/role management (ban/unban, mentor tayinlash)
- [ ] Course moderation queue (approve/reject + feedback)
- [ ] Financial oversight + payout approve/reject
- [ ] Category CRUD, banner/FAQ, komissiya % sozlamasi

## Faza 6 — Telegram Bot (Telegraf.js)
- [ ] /start linking (unique kod orqali web akkauntga bog'lash)
- [ ] Student: xarid cheki, reminder cron (3 kun harakatsiz), yangi kurs e'loni
- [ ] Mentor: sotuv alert, Q&A alert, moderation/payout status alert
- [ ] Superadmin: yangi kurs moderation'ga tushdi, payout threshold alert

## Faza 7 — To'lov integratsiyasi
- [ ] Payme/Click/Uzum Pay (yoki simulyatsiya) — checkout → enrollment tranzaksiya
- [ ] Double-charge/unpaid-access oldini olish (DB transaction)

## Faza 8 — Xavfsizlik & polish
- [ ] Signed URL expiry (60 min), JWT expiry qat'iy tekshiruv
- [ ] Responsive (mobile-first student, desktop mentor/admin)
- [ ] Toast (sonner), skeleton loading, error boundary
- [ ] To'liq RBAC matritsa audit (spec jadvali bo'yicha)

## Nazorat log
| Sana | Faza | Holat/eslatma |
|------|------|----------------|
| 2026-07-16 | 0 | PLAN.md yaratildi, Antigravity boshqaruvi boshlandi |
| 2026-07-16 | 0 | Antigravity: tailwind/shadcn/zustand setup + Prisma o'rnatildi, GitHub'ga (skillhub.git) push qilindi. Endi schema.prisma modellari + JWT Auth/RBAC ustida ishlamoqda |
