// Abro git bash, ejecuto node index.js y ahi queda activo nodejs con el código de abajo esperando una petición http.

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

	/*
	respuesta.end(`Usted solicito el siguiente archivo: ${archivo}`) // Si en la barra de direcciones pongo 127.0.0.1/contactos.html me va a mostrar eso
	*/

} ).listen(80) // Puerto80 es el genérico. Evita tener que especificar uno


