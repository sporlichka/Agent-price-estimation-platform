# Phase 1: System Specification (SSOT) — CFO Bot

## 1. Scope & Model Tiers

Бот должен поддерживать расчеты для следующих моделей (согласно коэффициентам сложности из предоставленного интерфейса):

| Model Name                  | Multiplier (M) | Base Rate (per 1M tokens) |
|-----------------------------|:--------------:|:-------------------------:|
| GPT-4.1                     | 0x (Free/Beta) | $0.00                     |
| GPT-4o                      | 0x (Included)  | $0.00                     |
| GPT-5 mini                  | 0x (Included)  | $0.00                     |
| Raptor mini (Preview)       | 0x             | $0.00                     |
| Claude Haiku 4.5            | 0.33x          | $0.25                     |
| Gemini 2.5 Pro              | 1x             | $3.50                     |
| Gemini 3 Flash (Preview)    | 0.33x          | $0.10                     |
| Gemini 3 Pro (Preview)      | 1x             | $3.50                     |
| Gemini 3.1 Pro (Preview)    | 1x             | $3.50                     |

## 2. Infrastructure Components (Hosting & DB)

Пользователь выбирает один из вариантов хостинга, который добавляет фиксированную стоимость ($H$) и стоимость за хранение/трафик ($S$):

- **Firebase:** Spark (Free) / Blaze (Pay-as-you-go)
- **Azure:** Standard B1s (~$7.50/mo)
- **Digital Ocean:** Basic Droplet ($4.00/mo)
- **PS Cloud (Kazakhstan):** Стандартный VPS (~3500 ₸ ≈ $7.80/mo)

## 3. Mathematical Model & Pricing Logic

**Monthly Cost Formula ($C_{mo}$):**

```math
C_{mo} = \left( \frac{Req \times T_{avg}}{10^6} \times Rate \times M \right) + H + (DB_{read} \times P_r) + (DB_{write} \times P_w) + BW
```

- **Req:** Количество запросов в месяц
- **T_{avg}:** Среднее кол-во токенов на запрос
- **M:** Коэффициент модели (из таблицы)
- **H:** Фиксированная цена хостинга
- **BW:** Bandwidth (трафик)

**Long-term Projection (n months):**

Для прогноза на $n$ месяцев с учетом инфляции или роста базы пользователей ($g$ — ежемесячный прирост в %):

```math
Total_n = \sum_{i=1}^{n} C_{mo} \times (1 + g)^{i-1}
```

## 4. Architectural Constraints

- **Tech Stack:** React 18+ (Vite), Tailwind CSS (для стилизации)
- **Deployment:** Firebase Hosting
- **State Management:** React Context или simple useState
- **Export:** Интеграция библиотеки jsPDF для генерации отчета

## 5. UI/UX Requirements (Apple Aesthetic)

- **Palette:** Monochrome (#FFFFFF, #F5F5F7, #1D1D1F)
- **Typography:** San Francisco (или системный sans-serif)
- **Layout:** Single-page application  
    - Сверху — селекторы моделей и хостинга  
    - В центре — слайдеры (количество запросов от 1к до 100М)  
    - Снизу — крупная цифра "Estimated Total"
- **Interactions:** Плавные переходы (transition), минималистичные тени (soft elevation)