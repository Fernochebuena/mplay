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

    autenticado:false,
    usuario:"",
    password:"",

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
         
        this.autenticado = window.localStorage.getItem("autenticado");
        if(this.autenticado=="true"){
           console.log("Autenticado");
           mainView.router.navigate('/home/',{animate:false});
        }else{
           console.log("Sesion Cerrada");
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
             
          /*

          app7.request({

            url:'http://172.19.128.198:8030/mplay-test/api.php?name=prueba', 
            data:{ username:this.usuario, password: this.password },
            method:'POST',
            crossDomain:true,
            success:function (data) {

            window.localStorage.setItem("autenticado", "true");
            this.autenticado = window.localStorage.getItem("autenticado");
            console.log(this.autenticado);

            app7.preloader.hide();
            mainView.router.navigate('/home/',{animate:true});
            console.log(data);
            console.log(data['username']);
         
         },
         error:function(error){

            alert(data);
         
         }});*/
        
         app7.preloader.hide();
         mainView.router.navigate('/home/',{animate:true});

      }

    },
    
    RegisterAccess:function(){

      mainView.router.navigate('/register/',{animate:true});
    
    },

    loginClose:function(){
     

        app7.panel.close();
        app7.dialog.confirm('¿Seguro, deseas salir de la aplicación?', function () {
            
        window.localStorage.setItem("autenticado", "false");
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
});