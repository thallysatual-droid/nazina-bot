const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth")

    const sock = makeWASocket({
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const texto = msg.message.conversation || ""
        const from = msg.key.remoteJid

        if (texto === "oi") {
            await sock.sendMessage(from, {
                text: "🌙 Olá! Eu sou o Nazuna Bot!"
            })
        }

        if (texto === "/help") {
            await sock.sendMessage(from, {
                text: "📜 Comandos:\n/help\n/menu"
            })
        }
    })
}

startBot()
