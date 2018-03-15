
    function  CargarWebcrawler(){
        console.log("hola");
        $.post('/cargarwebcrawler',
        {
        //   id: evento.id,
        //   start:evento.start,
        //   end:evento.end
        
        }, (response) => {
            MostrarWebcrawler(response)
        })
        
    }
    function MostrarWebcrawler(response){
        var Pantalla=document.getElementById('WebCrawler');
        Pantalla.innerHTML=JSON.stringify(response);
    }