var fs = require('fs');
var util = require('util');
var nodemailer = require('nodemailer');
var settingsPath = process.env.HOME + "/.send2k.json";
var storeFilePath = process.env.HOME + "/.send2k.store.json";
var storeFiles = require(storeFilePath);
console.log(storeFiles.list);
var sendFile = process.argv[2];
for(var i = 0 ; i< storeFiles.list.length; i++) {
	if(storeFiles.list[i] == sendFile) {
		process.exit();
}
}
var settings = require(settingsPath);
var smtpTransport = nodemailer.createTransport("SMTP",settings.smtpOption);
var mailOptions={
from:settings.smtpOption.auth.user,
to:settings.mailTo,
subject:"test",
text:"test",
attachments:[
{
filename:sendFile,
filePath:sendFile
}
]
};

smtpTransport.sendMail(mailOptions,function(error,response){
if(error){
console.log(error);
}else {
console.log("OK "+ response.message);
storeFiles.list.push(sendFile);
saveResult();
}
smtpTransport.close();
});

function saveResult() {
console.log(storeFiles);
fs.writeFileSync(storeFilePath,util.format("%j",storeFiles));
}
