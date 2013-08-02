// リーディングリストから未読のURLを取得する
var plist = require('plist');

var obj = plist.parseFileSync('url.plist');
//console.log(JSON.stringify(obj));

//lista = data['Children']
//rl=lista[lista.size-1]['Children']
//(0..598).each{|i|
//  puts rl[i]['URIDictionary']['title'] + " " + rl[i]['URLString']
//}
var lista = obj.Children;
var rl = lista[lista.length-1].Children;
for(var i =0;i<rl.length;i++){
    if(!rl[i].ReadingList.DateLastViewed) {
        console.log(/*rl[i].URIDictionary.title + " " + */rl[i].URLString);    
    } else {
        //console.log("DL="+rl[i].ReadingList.DateLastViewed);
    }
    
}
