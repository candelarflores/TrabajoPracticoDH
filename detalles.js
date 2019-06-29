 window.onload=function(){
   // lo primero que hago es verificar si el usuario esta loggeado
   // como los datos de session estan guardados como STRING, lo primero que hago es
   // convertirlos a objeto literal de nuevo
 var usuarioLoggeado = JSON.parse(sessionStorage.getItem('user'))
 // si no es nulo hay algo en session!!!
 if (usuarioLoggeado != null) {
   // como esta loggeado, pongo su nombre en el header
   document.querySelector("a.login").innerHTML = usuarioLoggeado.name
 }

 //fetch de generos
 fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=440802971cdf4ce44943068aee177199&language=en-US")
   .then(function(response) {
   return response.json()
   })
   .then(function(information) {
     console.log(information)

     var arrayDeGeneros = information.genres
     var divContenedor = document.querySelector("div.dropdown-content")
     var div = ""
     for (var i = 0; i < arrayDeGeneros.length; i++) {
         div= '<a href="generos.html?idDeGenero='+arrayDeGeneros[i].id+'&genero='+arrayDeGeneros[i].name+'" class="generos">'+ arrayDeGeneros[i].name+'</a>'
         div+='<br>'
         divContenedor.innerHTML += div
     }
   })
   .catch(function(error) {
   console.log("Error: " + error);
   })

   var btngeneros=document.querySelector("div.dropdown-content")
     btngeneros.onclick=function(){
       btngeneros.style.display=block
   }


   var urlParams = new URLSearchParams(window.location.search);
   var id = urlParams.get('idDePelicla');

   fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=440802971cdf4ce44943068aee177199&language=en-US")
     .then(function(response) {
     return response.json()
     })
     .then(function(information) {
       var nombrePelicula=(information.title);
       document.querySelector("h1.detalle").innerHTML=nombrePelicula;
       var imgfondo=(information.poster_path);
       var src=("https://image.tmdb.org/t/p/original"+imgfondo);
       document.querySelector("img.detalle").src=src;
       var detallePelicula=(information.overview);
       document.querySelector("p.descripcion").innerHTML=detallePelicula;
       var fecha=(information.release_date)
       document.querySelector("p.fecha").innerHTML=fecha
       var lenguaje=(information.spoken_languages[0].name)
       document.querySelector("p.lenguaje").innerHTML=lenguaje

       for(var i=0; i<4; i++){
       var genres=(information.genres[i].name)
       var generos=document.querySelectorAll("p.genero")
       generos[i].innerHTML=genres
     }
      console.log(information)
     })

     .catch(function(error) {
     console.log("Error: " + error);
     })

     //recomendaciones
     var urlParams= new URLSearchParams(window.location.search);
     var query=urlParams.get("id");
     fetch("https://api.themoviedb.org/3/movie/"+query+"recommendations?api_key=440802971cdf4ce44943068aee177199&language=en-US")
       .then(function(response) {
       return response.json()
       })
       .then(function(information) {
        console.log(information)

        var ul=document.querySelector("ul.recomendaciones")
        console.log(ul);

        for (var i = 0; i < information.results.length; i++) {
          var id=information.results[i].id;
          var titulo=information.results[i].title;
          var poster=information.results[i].poster_path;

          li="<li>"
          li+="<p>"+titulo+"</p>"
          li+="<a href=pagina3.html?id="+id+">"
          li+="</a>"
          li+="</li>"
          ul.innerHTML+=li
        }
       })

       .catch(function(error) {
       console.log("Error: " + error);
       })





 }
