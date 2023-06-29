// declaration a pour tester le setInterval
var a=0;
// Clé API OpenWeatherMap
const apiKey = "19b06fbd1ab2fe28c8e65b8df6588afa";

// création de la fonction meteo
function meteo() {
  // calcule du nbr d'actualisation
  console.log("La fonction meteo est appelée: "+ a++);
     //recuperer le nom de la ville de city.json
                // methode1:XMLHTTP
    // const appeljson = new XMLHttpRequest();
    // appeljson.open("GET", "conf.json");
    
    // appeljson.onload = function() {
    //     const data = JSON.parse(appeljson.responseText);
    //     var city = data.varcity;
    //     console.log(city)
    //   }
    // appeljson.send();

              //methode 2:fetch
    fetch("conf.json")
      .then(reponse => reponse.json())
      .then(data => {
        var city = data.varcity;
        console.log("Le conf.json est récupéré et la ville choisi est : "+city);
              // petit défi entre nous sur le groupe discord
              if (city == "string") {
                document.querySelector(".ville").textContent = "Slip Kangourou";
                document.querySelector(".icon").setAttribute("src", "Img/string.png");
              } else { 
        //  si ca marche => Effectuer une requête à l'API OpenWeatherMap
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric&lang=fr")
          .then(reponse => reponse.json())
          .then(data => {
            // Récupère les données météo
            var ville = data.name;
            var temperature = data.main.temp;
            var description = data.weather[0].description;
            var iconCode = data.weather[0].icon;
            var humidite = data.main.humidity;
            var vent = data.wind.speed;
            
            // Met à jour les éléments HTML avec les données météo
            document.querySelector(".ville").textContent = ville;
            document.querySelector(".temp").textContent = temperature + "°C";
            document.querySelector(".description").textContent = description;
            document.querySelector(".icon").setAttribute("src", "https://openweathermap.org/img/wn/"+ iconCode+ ".png");
            document.querySelector(".humidite").textContent = "Tx d'humidité : "+humidite +"%";
            document.querySelector(".vent").textContent = "Vitesse du vent: " + vent +" km/h";
            document.querySelector(".letitre").textContent = "Transport "+ ville;
            document.querySelector(".titre").textContent = "Ligne 136 , 389 - "+ ville;
          });
        }  
      })
    
      //si le Json ne fonctionne pas....pb de CORS
      .catch(error => {
        city = "Gradignan"  // clin d'oeil aux recruteurs
        console.log("Appel de l'API avec la ville par défaut :"+city)
        // Effectue une requête à l'API OpenWeatherMap avec la ville par défaut
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric&lang=fr")
          .then(reponse => reponse.json())
          .then(data => {
            // Récupère les données météo
            var ville = data.name;
            var temperature = data.main.temp;
            var description = data.weather[0].description;
            var iconCode = data.weather[0].icon;
            var humidite = data.main.humidity;
            var vent = data.wind.speed;
          
            // Met à jour les éléments HTML avec les données météo
            document.querySelector(".ville").textContent = ville;
            document.querySelector(".temp").textContent = temperature + "°C";
            document.querySelector(".description").textContent = description;
            document.querySelector(".icon").setAttribute("src", "https://openweathermap.org/img/wn/"+ iconCode+ ".png");
            document.querySelector(".humidite").textContent = "Tx d'humidité : "+humidite +"%";
            document.querySelector(".vent").textContent = "Vitesse du vent: " + vent +" km/h";
            document.querySelector(".letitre").textContent = "TBM "+ ville;
            document.querySelector(".titre").textContent = "TBM "+ ville;
          });
      });
}

// Lancer la fonction meteo
meteo();
// rafraichir 60min = 3600000 ms
setInterval(meteo,3600000);




