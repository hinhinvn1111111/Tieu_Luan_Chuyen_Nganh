let express = require('express');
let app = express();
let fs = require('fs');
let formidable = require('express-formidable');
app.use(formidable({uploadDir:'./image'}));
app.listen(3000,()=>console.log('Server started'));
app.post('/',(req,res)=>{
	console.log(req.files.avatar_foo)
	fs.rename(req.files.avatar_foo.path,req.files.avatar_foo.path + '.jpg',err=>{
		//res.send('Error');
	});
	// //console.log('http://192.168.40.2:8888/Server/'+req.files.image.path + '.jpg');
	// //res.send('http://192.168.40.2:8888/Server/'+req.files.image.path + '.jpg');
	// let a=req.files.image.path;
	// let b = a.slice(6,a.lenght);
	// console.log('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/ServerNodejs/image/' + b + '.jpg');
	// res.send('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/ServerNodejs/image/' + b + '.jpg');
});
