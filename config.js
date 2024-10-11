require("./database/module")

//GLOBAL PAYMENT
global.storename = "𝙎𝙖𝙣𝙕`𝙆𝙖𝙡𝙨𝙚𝙡 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇"
global.dana = "-"
global.qris = "https://a.top4top.io/p_319465f4i0.jpeg"


// GLOBAL SETTING
global.owner = "6289684349436" //masukin no lu
global.namabot = "𝙎𝙖𝙣𝙕`𝙆𝙖𝙡𝙨𝙚𝙡 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇"
global.nomorbot = "6289684349436" //masukin no lu
global.namaCreator = "𝙎𝙖𝙣𝙕`𝙆𝙖𝙡𝙨𝙚𝙡 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇"
global.linkyt = "-"
global.autoJoin = false
global.antilink = false
global.versisc = '𝟭𝟮.𝟬.𝟬'

// DELAY JPM
global.delayjpm = 5500

// SETTING PANEL
global.apikey = 'PLTC'
global.capikey = 'PLTA'
global.domain = 'https://domain.com'
global.eggsnya = '15'
global.location = '1'



//GLOBAL THUMB

global.codeInvite = ""
global.imageurl = 'https://i.ibb.co.com/rk7bqjc/5be664d9-e5da-4623-8e7f-64efc0c187c3.jpg'
global.isLink = 'https://whatsapp.com/channel/0029VahNvB6IyPtUAQ4qSl32'
global.packname = "Zyn"
global.author = "Zynxzo"
global.jumlah = "5"


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})