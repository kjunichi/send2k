// リーディングリストから未読のURLを取得する
var fs = require('fs');
var plist = require('plist');

var obj = plist.parse(fs.readFileSync('url.plist','utf8'));
//console.dir(obj);

var lista = obj.Children;
//console.dir(lista);
//console.log("lista.length = "+lista.length);
var i;
for(i = 0; i < lista.length; i++) {
	//console.dir(lista[i].Title);
	if(lista[i].Title == "com.apple.ReadingList") {
		break;
	}
}
var rl = lista[i].Children;
//console.dir(rl);

for(i =0;i<rl.length;i++){
	if(!rl[i].ReadingList.DateLastViewed) {
		console.log(rl[i].URLString);    
	}
}
