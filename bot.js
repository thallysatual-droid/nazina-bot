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
    })
}

// 🔥 ISSO SEGURA O BOT RODANDO
startBot()

// 👇 servidor fake pra não desligar
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Nazuna Bot está online 🚀")
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
