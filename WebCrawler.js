var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

var UrlInicial="https://www.youtube.com";
var NumeroMaximoPagina=10;
var NumeroPaginaVisitada=0;
var PaginasVisitadas=[];
var PaginasAVisitar=[];
var Url=new URL(UrlInicial);
var BaseUrl=Url.protocol+"//"+Url.hostname;
PaginasAVisitar.push(UrlInicial);

function Rastrear(){
  //condición para saber si no se a consultado el numero maximo de paginas
  if(NumeroPaginaVisitada>=NumeroMaximoPagina){
    console.log(JSON.stringify(PaginasVisitadas));
    console.log("Terminado Rastrear las primeras "+NumeroMaximoPagina);
    EscribirJson();
    return;
  }
  var ProximaPagina=PaginasAVisitar.pop();
  if(ProximaPagina in PaginasVisitadas){
    Rastrear();
  }else{
    VisitarPagina(ProximaPagina,Rastrear);
  }
}

function VisitarPagina(url, callback){
  //se agrega la pagina al arreglo y se aumenta el valor de la paginas visitadas
  // PaginasVisitadas[url]=true;
  
  var Pagina={url:url, ranking:0,enlaces:"", ruta:""};
  if(PaginasVisitadas.find((elemento)=>elemento.url==url)==undefined){
  PaginasVisitadas.push(Pagina);
  NumeroPaginaVisitada++;
  }

  request(url,function(error,response,body){

    /*
    codigo = 200 indica que la pagina esta correcta
    si la pagina retorna un codigo diferente a 200 indica que la pagina 
    a presentado un error
    */
    if(response.statusCode!==200){
      callback();
      return;
    }
    var $=cheerio.load(body);
    ColectarRutas($);
    callback();
  });
}

function ColectarRutas($){
    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function() {
        if(($(this).attr('href')).indexOf("//")==-1 &&
            ($(this).attr('href')!="/" &&
            PaginasVisitadas.find((elemento)=>elemento.url==BaseUrl + $(this).attr('href'))==undefined) 
            ){
              PaginasAVisitar.push(BaseUrl + $(this).attr('href'));
        }
    });
}

function EscribirJson(){
    
    fs.writeFile('webcrawler.json', JSON.stringify (PaginasVisitadas), function(err){
        // console.log('Creado archivo Json del Web Crawler');
    })
}

exports.Rastrear=Rastrear;