 //EJERCICIO HECHO POR NOSOTROS
// Abro git bash, ejecuto node index.js y ahi queda activo nodejs con el código de abajo esperando una petición http.
/*
let http = require("http") // Es para traer todo lo que esta en la carpeta node modules/http que me descargue desde la consola con "npm install http". Eso me trajo la librería de la página https://www.npmjs.com/search?q=http
let fs = require ("fs")

http.createServer( function (peticion, respuesta){

	let archivo = peticion.url 

	// archivo = archivo.substr(1) // Cuando esta guardando el valor /index.html -> Hay que volar la barra

	fs.readFile("public" + archivo, function(error, file){

		if (error) {

			respuesta.end("Ups! Algo salio mal")
		} else {

			respuesta.end(file)
		}

	})
*/
	/*
	respuesta.end(`Usted solicito el siguiente archivo: ${archivo}`) // Si en la barra de direcciones pongo 127.0.0.1/contactos.html me va a mostrar eso
	*/
/*
} ).listen(80) // Puerto80 es el genérico. Evita tener que especificar uno
*/

//EJERCICIO COMPARTIDO  POR SILVIO

/* 
Instalar npm install -g nodemon
1) Ejecutar:
netstat -ano | findstr :80
Si quiero cancelar la conexion abierta ejecuto lo sigiente:
2) Identificar el PID
3) Ejecutar (con el PID identificado)
taskkill -PID elPIDindicado -F
*/

const http = require("http");
const fs = require("fs");

// const port = PUERTO_DE_HEROKU || PUERTO_MIO

const port = process.env.PORT || 80 // el process.env.port busco el puerto que le asignó el entorno en donde está corriendo. Si no existe, agarra el 80

http.createServer((request, response) => {
		
		let dir = "public/";

		let file = (request.url == "/") ? "index.html" : request.url;
			file = (file.match(/[^.]+(\.[^?#]+)?/) || [])[0];
		
		let ext = file.substring( file.lastIndexOf(".") ).toLowerCase();

		let types = {
			".html"	: "text/html",
			".js"	: "text/javascript",
			".css"	: "text/css",
			".txt" 	: "text/plain",
			".json"	: "application/json",
			".png"	: "image/png",
			".jpg"	: "image/jpg",
			".gif"	: "image/gif",
			".ico"	: "image/x-icon",
			".wav"	: "audio/wav",
			".mp4"	: "video/mp4",
			".woff"	: "application/font-woff",
			".ttf"	: "application/font-ttf",
			".eot"	: "application/vnd.ms-fontobject",
			".otf"	: "application/font-otf",
			".svg"	: "application/image/svg+xml"
		};

		let contentType = types[ext] || "application/octet-stream";

		fs.readFile( dir + file, (error, content) => {
			
			if ( error ) {
				response.writeHead(404, { "Content-Type" : "text/plain" } );
				response.end("ARCHIVO NO ENCONTRADO");
			} else {
				response.writeHead(200, { "Content-Type" : contentType } );
				response.end(content);
			}

		});

}).listen(port); // cuando lo uso en mi máquina puedo usar el puerto 80 que es el general. Para usar en Heroku necesito saber que puerto me asignó


