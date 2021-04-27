const http = require('http')
const fs = require('fs')
var url = require('url')
var	path = require('path')
const bodyparser = require('body-parser')
const handlebars = require('handlebars')
const db = require('./models');
var parser = require('handlebars-error-parser').parser;

var mimeTypes = {
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',

	'json': 'application/json',
	'pdf': 'application/pdf',
	'doc': 'application/msword',

	'ico': 'image/x-icon',
	'png': 'image/png',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpeg',
	'svg': 'image/svg+xml',

	'wav': 'audio/wav',
	'mp3': 'audio/mpeg'
};



// const userData = {
//     UserID: "103", 
//     name: "khushbu",
// age: 22,
// marks: 51

// }

// db.user.create(userData).then( res => {
//     console.log(res)
// }).catch(error => {
//     console.log(error)
// })

// db.user.findAll().then(result => {
//     console.log(result)
// })



const port = process.env.PORT || 8000;




http.createServer(function(req, res) {

	var urlAll = url.parse(req.url, true);
	var uri = urlAll.pathname;
	var queryParams = urlAll.query;
	
    // console.log(urlAll);
    // console.log(uri);
    // console.log(req.method);


    var filename = path.join(process.cwd(), "static", unescape(uri));
	// console.log("Static path: " + filename);
    if(fs.existsSync(filename) && fs.lstatSync(filename).isFile()){
        // console.log("Static path exists");
        var mimeType = mimeTypes[path.extname(filename).split(".").reverse()[0]];
        res.writeHead(200, {'Content-Type': mimeType} );

        var fileStream = fs.createReadStream(filename);
        try{
            fileStream.pipe(res);
        }
        catch(err){
            console.log("not a file: ", err);
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            return;
        }
    }
    else{
        // console.log("No static path, checking dynamic URL");
        if(req.method.toLowerCase() == 'get') {
            //do your processing
                if(uri==="/index"){

                    db.user.findAll().then(data2 => {
                        console.log(data2)
                        var name =[]
                        var age = []
                        var marks = []
                        for(let i =0; i<data2.length;i++){
                            name.push(data2[i].name)
                            age.push(data2[i].age)
                            marks.push(data2[i].marks)
                        }


                        var data = {
                            heading: 'Students Info',
                            name,
                            age,
                            marks
                        }

                    // var data = {
                    //     heading: 'Students Info',
                    //     name: ['joe', 'lina', 'gena', 'lily'],
                    //     age: ['10', '9', '10', '11'],
                    //     marks: ['90', '85', '40', '50']
                    // }
                
                try{
                    handlebars.registerPartial('students', fs.readFileSync(path.join(process.cwd(),'templates/partials/students.html.hbs'), 'utf-8'));
                    source = fs.readFileSync(path.join(process.cwd(),'templates/index.html.hbs'), 'utf-8');
                    var template = handlebars.compile(source);
                    var htmlData = template(data);
                    res.writeHead(200, {'Content-Type': "text/html"});  // reponse OK
                    res.write(htmlData);
                    res.end();
                }
                catch (err){
                    console.log(err);
                    res.writeHead(500, {'Content-Type': "text/plain"});  // reponse Error
                    res.write("Internal server error");
                    res.end();
                }


            }).catch(error => {
                console.log(error.message)
            })

            }
            else{
                res.writeHead(404, {'Content-Type': 'text/plain'});     // response Not found
                res.write('404 Not Found\n');
                res.end();
            }
        }

        else{
            var data ="", parsedData;
            req.on("data",function(chunk){
                data += chunk;
            });
            req.on("end",function(data){
                parsedData = parse(data.user.UserID);      // data sent with post/put... e.g html forms
                parsedData = parse(data.user.name);   
                parsedData = parse(data.user.age);   
                parsedData = parse(data.user.marks);   
                console.log(parsedData)
                // console.log(parsedData);
                if (req.method.toLowerCase() == 'post') {
    
                    //for redirecting to new path
                   res.writeHead("303", {'Location': "/index.html"});      // path/to/new/url
                }

                // else if (req.method.toLowerCase() == 'put') {
                //     //do your processing
                // }
                // else if (req.method.toLowerCase() == 'delete') {
                //     //do your processing
                // }
                res.end();
            });
        }


       
    return;
}}).listen(port);
