import 'dotenv/config';
import { Bot } from 'grammy';

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('Не найден BOT_TOKEN в окружении');
  process.exit(1);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  await ctx.reply('Привет! Я базовый бот и могу повторять твои сообщения.');
});

bot.on('message:text', async (ctx) => {
  const message = ctx.message.text.trim();
  if (!message) {
    await ctx.reply('Отправь текст, чтобы я его повторил.');
    return;
  }
  await ctx.reply(`Ты написал: ${message}`);
});

bot.catch((err) => {
  console.error('Ошибка в обработчике:', err);
});

const isDev = process.env.NODE_ENV !== 'production';

bot.start({
  onStart: (info) => {
    console.log(`Бот @${info.username} запущен (${isDev ? 'polling' : 'production'})`);
  },
});

