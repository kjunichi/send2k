var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP",{
service:"Gmail",
auth:{
user:"junichi.kajiwara@gmail.com",
pass:"miwxngsanwplyyqy"
}
});

var mailOptions={
from:"junichi.kajiwara@gmail.com",
to:"junichi.kajiwara@kindle.com",
subject:"test",
text:"test",
attachments:[
{
filename:"100.pdf",
filePath:"100.pdf"
}
]
};

smtpTransport.sendMail(mailOptions,function(error,response){
if(error){
console.log(error);
}else {
console.log("OK "+ response.message);
}
smtpTransport.close();
});


