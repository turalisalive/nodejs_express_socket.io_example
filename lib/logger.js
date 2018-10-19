/*** created by Tural Ziyatkhanly **/

var fs = require('fs');
var logger = function () {};
logger.prototype.write = function (type,data) {
    var logData;
    if(type === 'REQUEST'){
        logData  =
            "++++++++++++++++    "+new Date()+" ++++++++++++++++\n"+
            "+ TYPE: REQUEST!\n"+
            "+ Date: "+new Date()+"\n"+
            "+ Request URL: "+data.hostname+data.url+"\n"+
            "+ Request Content-Type: "+data.headers['content-type']+"\n"+
            "+ Request Method: "+data.method+"\n"+
            "+ Request Body: "+JSON.stringify(data.body)+"\n"+
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n";
    }
    else if(type === 'RESPONSE'){
        logData  =
            "++++++++++++++++    "+new Date()+" ++++++++++++++++\n"+
            "+ TYPE: RESPONSE!\n"+
            "+ Date: "+new Date()+"\n"+
            "+ Response Body: "+JSON.stringify(data.body)+"\n"+
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n";
    }


    // console.log(logData);
    fs.appendFile(__dirname+'/../logger.log', logData, function(err){
        if (err) throw err;
    });
};

module.exports = logger;
