const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200)
  res.end('Bot is running')
}).listen(process.env.PORT || 3000)


const mineflayer = require('mineflayer')

const config = {
  host: 'VoidedSMP.aternos.me',
  port: 38491,
  username: 'AFK_Bot',
  version: '1.21.8',
  reconnectDelay: 5000
}

console.log("🚀 Bot starting...")

let bot

function createBot() {
  console.log("📡 Connecting to VoidedSMP...")

  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  })

  bot.once('login', () => {
    console.log("🔑 Logged into server")
  })

  bot.once('spawn', () => {
    console.log("✅ Bot spawned in world")
  })

  bot.on('message', (msg) => {
    console.log("💬 Chat:", msg.toString())
  })

  bot.on('kicked', (reason) => {
    console.log("⛔ Kicked:", reason?.toString())
  })

  bot.on('error', (err) => {
    console.log("❌ Error:", err?.message || err)
  })

  bot.on('end', () => {
    console.log("🔌 Disconnected — retrying in 5s...")
    setTimeout(createBot, config.reconnectDelay)
  })
}

// start bot
createBot()

// heartbeat so you KNOW it’s running
setInterval(() => {
  console.log("📡 Bot alive")
}, 15000)
