/*****************************
Autor:Jose Carlos Ruiz
Fecha Modificacion: 07/07/2018
Archivo JS
******************************/
var $$ = Dom7;

var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  /*panel: {
    swipe: 'left',
  },*/
  // Add default routes
  routes: routes
  // ... other parameters
});


var mainView = app7.views.create('.view-main'); 


var app = {

    autentificado: false,
    usuario:"",
    password:"",
    nombre:"",
    hostname:"http://appsnochebuena.online",
    urlVideo:"",



    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        console.log("VARIABLE AUTENTIFICADO:"+window.localStorage.getItem("autentificado"));


          if(window.localStorage.getItem("autentificado")=="true"){

             mainView.router.navigate('/home/',{animate:true});


          }


         
        
         
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },
    loginAccess:function(){


      this.usuario = $$('#usuario').val();
      this.password = $$('#password').val();


      if(this.usuario == "" || this.password == ""){
         
         app7.dialog.alert('Debes de ingresar usuario y/o contraseña');
           
      }else{

        app7.preloader.show();
        
        /*setTimeout(function () {
            
            app7.preloader.hide();
            mainView.router.navigate('/home/',{animate:true});
        
        }, 4000);*/

        app7.request({
              url:this.hostname+'/mplay/api/login.php',
              data:{username:this.usuario,password: this.password},
              method: 'POST',
              crossDomain: true,

              success:function(data){
                

                app7.preloader.hide();
                var objson = JSON.parse(data);
               
                
                 
                 if (objson.data == 'Autenticado') {

                  window.localStorage.setItem("Autenticado", "true");
                  this.autenticado = window.localStorage.getItem("Autenticado");
                  //console.log(this.autentificado); 
                   mainView.router.navigate('/home/',{animate:true});

                 }else{

                  app7.dialog.alert("usuario o password incorrecto");
                 }
                
                //console.log(objson.data);

              },

              error:function(error){

                alert(error);
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(error);
              }


});
             

          

      }

    },
    

    RegisterAccess:function(){

      mainView.router.navigate('/register/',{animate:true});
      app7.panel.close();

    
    },

    Contacto:function(){

      mainView.router.navigate('/Contacto/',{animate:true});
      app7.panel.close();

    
    },

  SendComments:function(){
    var nombre=$$('#ctc_nombre').val();
    var email=$$ ('ctc_email').val();
    var asunto=$$('ctc_asunto').val();
    var comentarios=$$('ctc_comentarios').val();

    app7.request({
              url:this.hostname+'/mplay/api/contacto.php',
              data:{nombre:nombre,email:email,asunto:asunto,comentarios:comentarios},
              method: 'POST',
              crossDomain: true,

              success:function(data){
              alert(data);
                app7.preloader.hide();
                var objson = JSON.parse(data);
                app7.dialog.alert("hemos recibido su mensaje correctamente");
                mainView.router.navigate('/home/',{animate:true});
               
                },
                error:function(error){

                  app7.preloader.hide();
                  app7.dialog.alert("Hubo un errror por favor intenta nuevamente");
                  console.log(error);

                }


});
  },


   RegisterUser: function(){

      this.nombre = $$('#frm_name').val();
      this.usuario = $$('#frm_username').val();
      this.password = $$('#frm_password').val();


     

     app7.request({
              url:thos.hostname+'/mplay/api/users.php',
              data:{usuario:this.usuario,password: this.password,nombre: this.nombre},
              method: 'POST',
              crossDomain: true,

              success:function(data){

                app7.preloader.hide();
                var objson = JSON.parse(data);
                mainView.router.navigate('/login/',{animate:true});


                 

},
                error:function(error){
                app7.preloader.hide();
                app7.dialog.alert("hubo un error por favor intenta nuevamente");
                console.log(data);
              
}
              });

    },

    loginClose:function(){
     

        app7.panel.close();
        app7.dialog.confirm('¿Seguro, deseas salir de la aplicación?', function () {
            
        window.localStorage.setItem("autentificado", "false");
        mainView.router.navigate('/login/',{animate:true});
    
      });

    }
};


function showMenu(){

   app7.panel.open('left', true);

}


$$(document).on('page:init', '.page[data-name="home"]', function (e) {
      console.log('View Home load Init!');
      app7.panel.allowOpen = true;
      app7.panel.enableSwipe('left');

      var $ptrContent =app7.ptr.create('.ptr-content');

      $ptrContent.on('refresh',function (e) {

        RefreshVideos();

      });

getslider();
      getvideos();





           
});

$$(document).on('page:init', '.page[data-name="search"]', function (e) {
//buscar("noticia");

$$('#search1').on('keyup',function(e){
  var keyCode=e.keycode||e.which;
  if (keyCode === 13){
    buscar($$('#search1').val());
    e.preventDefault();
    return false;
}else{

}
  
  });

});





function getvideos(){

  app7.preloader.show();

  app7.request({
    url:app.hostname+'/mplay/api/videos.php',
    method:'GET',

    crossDomain:true,


    success:function(data){

      app7.preloader.hide();

      var objson=JSON.parse(data);
      var video ="";
      var img="";

      for(x in objson.data){
        console.log(objson.data[x].titulo);
        img=app.hostname+'/mplay/img/'+objson.data[x].imagen;
        video = '<div class="item"><div class="post"><img src="img/'+objson.data[x].imagen+'" onClick="goVideo(\''+objson.data[x].titulo+'\',\''+objson.data[x].url+'\')"><div class="time">10:05</div></div><h5>'+objson.data[x].titulo+'</h5><p>'+objson.data[x].autor+'</p><p>25 visitas|20 Agosto</p></div>';

              $$('#content-videos').append(video);


      }

      


    },

    error:function(error){

      app7.preloader.hide();
      app7.dialog.alert("Hubo un errror por favor intenta nuevmente");
      console.log(error);

    }   
  }
);
}

function RefreshVideos(){

  app7.request({
    url:app.hostname+'/mplay/api/videos.php',
    method:'GET',

    crossDomain:true,


    success:function(data){

      app7.ptr.done();

      $$('#content-videos').html("");

      
      var objson=JSON.parse(data);
      var video ="";

      for(x in objson.data){
        console.log(objson.data[x].titulo);

        video = '<div class="item"><div class="post"><img src="img/'+objson.data[x].imagen+'"><div class="time">10:05</div></div><h5>'+objson.data[x].titulo+'</h5><p>'+objson.data[x].autor+'</p><p>25 visitas|20 Agosto</p></div>';


$$('#content-videos').append(video);


      }

      


    },

    error:function(error){

      app7.preloader.hide();
      app7.dialog.alert("Hubo un errror por favor intenta nuevmente");
      console.log(error);

    }   
  }
);




}

function getslider(){

  app7.preloader.show();

  app7.request({
    url:app.hostname+'/mplay/api/slider.php',
    method:'GET',

    crossDomain:true,


    success:function(data){

      app7.preloader.hide();

      var objson=JSON.parse(data);
      var video ="";

      var swiper=app7.swiper.get('.swiper-container');

      swiper.removeAllSlides();


      for(x in objson.data){

        console.log(objson.data[x].titulo);

        var slide = '<div class="swiper-slide"><div class="mask"></div><img src="img/slider1.jpg" /><div class="caption"><h2>10 very beautiful rugby ball catches</h2><p>10 Junio 2018</p><button>Play Now</button></div></div>';

        swiper.appendSlide(slide);

       // video = '<div class="item"><div class="post"><img src="img/'+objson.data[x].imagen+'"><div class="time">10:05</div></div><h5>'+objson.data[x].titulo+'</h5><p>'+objson.data[x].autor+'</p><p>25 visitas|20 Agosto</p></div>';


//$$('#content-videos').append(video);


      }

    },

    error:function(error){

      app7.preloader.hide();
      app7.dialog.alert("Hubo un errror por favor intenta nuevmente");
      console.log(error);

    }   
  }
);

}

function buscar(buscar){

var buscar=buscar;

$$('#list-search').html("");

 app7.preloader.show();

  app7.request({
           url: app.hostname+'/mplay/api/search.php?buscar='+buscar,
           method:'GET',
           crossDomain: true,
           success:function(data){

            alert(data);
            
            app7.preloader.hide();

            var objson = JSON.parse(data);
            var video = "";

            if (objson.data=="NO_ENCONTRADOS"){
              video="<li>NO SE ENCONTRARON RESULTADOS</li>";
              $$('#list-search').append(video);
            }else{

          
            for(x in objson.data){
                  console.log(objson.data[x].titulo);

                  video ='<li><a href="#" class="item-link item-content"><div class="item-media"><img src="../www/img/post.jpg" width="80"/></div><div class="item-inner"><div class="item-title-row"><div class="item-title">Yellow Submarine</div><div class="item-after">$15</div></div><div class="item-subtitle">Beatles</div><div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></div></a></li>';

                   $$('#list-search').append(video);

             }
}
           },

           error:function(error){

            app7.preloader.hide();
            app7.dialog.alert("Hubo un error por favor intenta nuevamente");
            console.log(error);
   
  }
});
}

function goVideo(titulo,url){
  app.tituloVideo=titulo;
  app.urlVideo=url;

  //alert(url);
  //alert(url)
    mainView.router.navigate('/video/',{animate:true});

}

$$(document).on('page:init','.page[data-name="video"]', function (e){
   console.log(app.urlVideo);

   //alert(app.urlVideo);
   $$('.videoyoutube iframe').remove();
   $$('<iframe width="100%" height="200" frameborder="0" allowfullscreen></iframe>').attr('src',app.urlVideo).appendTo('.videoyoutube');      
});

