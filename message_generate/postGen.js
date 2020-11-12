const getStatus = require('../api/post');

try{
    getStatus("EF582568151TH").then((data)=>{
        let str = `สถานะ -> ไปรษณีย์\n`;
        str += data.status_description
        str += ' : ';
        str += data.delivery_description
        console.log(str);
    });
}
catch(err){
    console.log();
}