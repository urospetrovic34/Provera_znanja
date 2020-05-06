const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

let podaci = [{
		"id":1,
		"naziv":"Dukserica",
		"cena":1500,
		"imeKompanije":"H&M",
	},
	{
		"id":2,
		"naziv":"Majica",
		"cena":3566,
		"imeKompanije":"H&M",
	},
	{
		"id":3,
		"naziv":"Jakna",
		"cena":2344,
		"imeKompanije":"H&M",
	},
	]

const server = http.createServer(function(req,res){
	let urlObj = url.parse(req.url,true,false)
	if(req.method == "GET"){
		if(urlObj.pathname == "/sviArtikli"){
		response = sviArtikli();
			res.write(`
		<!DOCTYPE html>
		<html>
		<head>
    		<title></title>
		</head>
		<body>`);
		for(let r of response){
			res.write(`${r.id},${r.naziv},${r.cena},${r.imeKompanije}`);
		}
		res.end(`</body>
		</html>`)
		}
		else if(urlObj.pathname == "/dodajArtikal"){
		
			res.write(`
		<!DOCTYPE html>
		<html>
		<head>
    		<title></title>
		</head>
		<body>
		<form action='/dodajArtikal' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        NAZIV: <input type='text' name='naziv'><br><br>
                        CENA: <input type='text' name='cena'><br><br>
                        IMEKOMPANIJE: <input type='text' name='imeKompanije'><br><br>
        <button type='submit'>DODAJ ARTIKAL</button>
        </form>
		</body>
		</html>`);
		}
		else if(urlObj.pathname == "/obrisiArtikal"){
		
			res.write(`
		<!DOCTYPE html>
		<html>
		<head>
    		<title></title>
		</head>
		<body>
		<form action='/obrisiArtikal' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        <button type='submit'>OBRISI ARTIKAL</button>
        </form>
		</body>
		</html>`);
		}
		else if(urlObj.pathname == "/sviPonudjeni"){
		
			res.write(`
		<!DOCTYPE html>
		<html>
		<head>
    		<title></title>
		</head>
		<body>
		<form action='/sviArtikli' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                    <button type='submit'>POTRAZI ZA TAJ ID</button>
        </form>
		</body>
		</html>`);
		}
		else if(urlObj.pathname == "/izmeniArtikal"){
		
			res.write(`
		<!DOCTYPE html>
		<html>
		<head>
    		<title></title>
		</head>
		<body>
		<form action='/izmeniArtikal' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        NAZIV: <input type='text' name='naziv'><br><br>
                        CENA: <input type='text' name='cena'><br><br>
                        IMEKOMPANIJE: <input type='text' name='imeKompanije'><br><br>
        <button type='submit'>IZMENI ARTIKAL</button>
        </form>
		</body>
		</html>`);
		}
		
	}
	else if(req.method == "POST"){
		if (urlObj.pathname == "/dodajArtikal"){
			var body = '';
			req.on('data',function(data){
				body += data
			})
			req.on('end', function () {
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,querystring.parse(body).cena,querystring.parse(body).imeKompanije)
                res.writeHead(302, {
                    'Location': '/sviArtikli'
                });
                res.end();
            });
		}
		else if(urlObj.pathname == "/sviPonudjeni"){
			var body = '';
			req.on('data',function(data){
				body += data
			})
			req.on('end', function () {
                dodajArtikal(querystring.parse(body).id)
                res.writeHead(302, {
                    'Location': '/sviArtikli'
                });
                res.end();
            });
		}
		else if(urlObj.pathname == "/obrisiArtikal"){
			var body = '';
			req.on('data',function(data){
				body += data
			})
			req.on('end', function () {
                dodajArtikal(querystring.parse(body).id)
                res.writeHead(302, {
                    'Location': '/sviArtikli'
                });
                res.end();
            });
		}
		else if(urlObj.pathname == "/izmeniArtikal"){
			var body = '';
			req.on('data',function(data){
				body += data
			})
			req.on('end', function () {
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,querystring.parse(body).cena,querystring.parse(body).imeKompanije)
                res.writeHead(302, {
                    'Location': '/sviArtikli'
                });
                res.end();
            });
		}
	}
})

const port = 8080;
const host = "127.0.0.1";
server.listen(port,host);

function sviArtikli(imeKompanije){
	if(imeKompanije!=null)
	{
	let spec = []
	for(let i=0;i<podaci.length;i++){
		if(podaci[i].imeKompanije==imeKompanije)
		{
			spec.push(podaci[i])
		}
	}
	return spec;

	}
	else
		return podaci
}

function dodajArtikal(id,naziv,cena,imeKompanije){
	let noviArtikal = {"id":parseInt(id),"naziv":naziv,"cena":cena,"imeKompanije":imeKompanije}
	podaci.push(noviArtikal)
}

function obrisiArtikal(id){
	let id1=parseInt(id);
	for(let i=0;i<podaci.length;i++)
	{
		if(podaci[i].id==id1)
		{
			podaci.splice(i,1);
		}
	}
}

function izmeniArtikal(id,naziv,cena,imeKompanije){
	let id2=parseInt(id);
	for(let i=0;i<podaci.length;i++)
	{
		if(podaci[i].id==id2)
		{
			podaci[i].naziv = naziv
			podaci[i].cena = cena
			podaci[i].imeKompanije = imeKompanije
		}
	}
}