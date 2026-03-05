# Orders & Products (Next.js + TypeScript)

Тестовое приложение с двумя страницами: `Orders` и `Products`.

## Стек
- React 19 + Next.js 16 (App Router, SSR/SSG)
- TypeScript
- Redux Toolkit + React Redux
- SCSS (БЭМ) + Bootstrap
- REST через Axios (`/api/orders`, `/api/products`)
- WebSocket (`socket.io-client`) + fallback-счетчик активных вкладок
- `react-hook-form` (валидация формы удаления)
- Lazy loading (`next/dynamic`)
- Charts (`chart.js`, `react-chartjs-2`)
- Maps (OpenStreetMap embed)
- JWT (`jwt-decode`)
- Web Storage (`localStorage`)
- i18n (RU/EN переключение)

## Реализовано по заданию
- Компоненты: `Navigation`, `TopMenu`, страницы `Orders` и `Products`.
- Роутинг между страницами и анимация переходов.
- В `TopMenu`: текущее время/дата в real-time, язык, пользователь из JWT, счетчик активных вкладок.
- В `Orders`:
  - список приходов с количеством продуктов;
  - даты в двух форматах;
  - суммы по валютам (USD/UAH);
  - открытие/закрытие детального блока справа;
  - удаление прихода через попап с валидацией (нужно ввести `DELETE`);
  - lazy-блоки: график и карта.
- В `Products`:
  - список всех продуктов;
  - фильтр по типу (select);
  - название, тип, статус, серийный номер;
  - даты гарантии и дата создания (разные форматы);
  - цены в двух валютах;
  - название связанного прихода.

## Установка и запуск
```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Проверки
```bash
npm run lint
npm run build
```

## Структура
- `src/app/orders/page.tsx` - страница приходов
- `src/app/products/page.tsx` - страница продуктов
- `src/components/Navigation` - меню навигации
- `src/components/TopMenu` - верхнее меню
- `src/store` - Redux slices/store
- `src/app/api` - REST endpoints
- `src/lib` - i18n и форматирование

## WebSocket примечание
Клиент пытается подключиться к `http://localhost:4000` через `socket.io-client`.  
Если сокет-сервер недоступен, включается локальный fallback-счетчик активных вкладок между окнами браузера.
