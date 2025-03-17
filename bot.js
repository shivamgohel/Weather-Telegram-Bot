require("dotenv").config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

bot.start((ctx) => ctx.reply('Welcome To The Weather Bot 🌤'));
bot.on('sticker' , (ctx) => ctx.reply('❤️'));

bot.command('developer' , (ctx) => ctx.reply('Shivam 🚀'));

bot.command('weather', async(ctx) => {
    const city = ctx.message.text.replace("/weather", "").trim();
    if(!city) return ctx.reply("Enter a city name after /weather.");

    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const { data } = await axios.get(url);

        ctx.reply(
            `🌍 *${data.name}, ${data.sys.country}*\n` +
            `☁️ ${data.weather[0].description}\n` +
            `🌡 ${data.main.temp}°C\n` +
            `💨 ${data.wind.speed} m/s`,
        );
    }
    catch {
        ctx.reply("❌ City not found.");
    }

});


bot.launch();
// telegram username = @weather_telegram_testing_bot