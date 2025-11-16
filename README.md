# Базовый Telegram-бот (Node.js 22)

## Требования
- Ubuntu 24.04 LTS с установленным Node.js 22.x и npm 10+
- Токен Telegram-бота из `@BotFather`

## Быстрый старт
1. Склонируйте репозиторий и перейдите в каталог проекта.
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` по образцу `env.example` и добавьте `BOT_TOKEN`.
4. Запустите бота в режиме разработки:
   ```bash
   npm run dev
   ```

## Продакшен
### Сбор переменных окружения
```
cp env.example .env
nano .env
```

### Запуск под systemd
Создайте `/etc/systemd/system/tgbot.service`:
```
[Unit]
Description=Telegram Bot
After=network.target

[Service]
Type=simple
Restart=always
WorkingDirectory=/opt/tgbot
ExecStart=/usr/bin/node /opt/tgbot/src/bot.js
EnvironmentFile=/opt/tgbot/.env

[Install]
WantedBy=multi-user.target
```
Перезапустите демон systemd и активируйте сервис:
```
sudo systemctl daemon-reload
sudo systemctl enable --now tgbot.service
```

### Обновление
```
git pull
npm install --omit=dev
sudo systemctl restart tgbot.service
```

Бот использует long polling и не требует внешнего вебхука. Если нужен вебхук, настройте прокси/HTTPS и замените `bot.start()` на запуск HTTP‑хук обработчика из `grammy`.

