/*
 Script by Re-Jeong Guanxii













 
*/
require("./database/global")

const func = require("./database/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.red.bold('╭━━━━┳╮╱╱╭┳━╮╱╭╮\n╰━━╮━┃╰╮╭╯┃┃╰╮┃┃\n╱╱╭╯╭┻╮╰╯╭┫╭╮╰╯┃\n╱╭╯╭╯╱╰╮╭╯┃┃╰╮┃┃\n╭╯━╰━╮╱┃┃╱┃┃╱┃┃┃\n╰━━━━╯╱╰╯╱╰╯╱╰━╯\n╭━━━━┳━━━━┳╮╱╱╭╮\n┃╭╮╭╮┣━━╮━┃╰╮╭╯┃\n╰╯┃┃╰╯╱╭╯╭┻╮╰╯╭╯\n╱╱┃┃╱╱╭╯╭╯╱╰╮╭╯╱\n╱╱┃┃╱╭╯━╰━╮╱┃┃╱╱\n╱╱╰╯╱╰━━━━╯╱╰╯╱╱\n\nRe--Jeong Version 4.0.0\n\nCreated By : Re-Jeong Developer\nTelegram : @guanxiirejeong\nSubscribe Youtube : @Re-Jeong'))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]   
// browser: ['Chrome (Linux)', '', '']
}
const zyn = func.makeWASocket(connectionOptions)
if(usePairingCode && !zyn.authState.creds.registered) {
		const phoneNumber = await question(chalk.green('\nEnter Your Number\nNumber : '));
		const code = await zyn.requestPairingCode(phoneNumber.trim())
		console.log(chalk.green(`Your Pairing Code : ${code} `))

	}
store.bind(zyn.ev)

zyn.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
zyn.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
zyn.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
zyn.sendMessage(`27623649420@s.whatsapp.net`, { text: `\`𝗛𝗶 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿\`
  Re-Jeong-V4 was connected, contact +27623649420 if you need any help`})
if (autoJoin) {
zyn.groupAcceptInvite(codeInvite)
}
}
})

zyn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await zyn.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await zyn.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await zyn.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
	}
zyn.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return zyn.readMessages([m.key])
if (!zyn.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(zyn, m, store)
require("./rejeong")(zyn, m, store, rejeong)
} catch (err) {
console.log(err)
}
})

zyn.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = zyn.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

zyn.public = true

zyn.ev.on('creds.update', saveCreds)
return zyn
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})
