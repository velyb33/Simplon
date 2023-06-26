// declaration a pour tester le setInterval
var a=0
// je declare la fonction meteo
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
  // fetch("conf.json")
  // .then(response => response.json())
  // .then(data => {
  //   // Récupère les données météo
  //   var city = data.varcity;
  // });
 
  //charger le dom
  document.addEventListener('DOMContentLoaded', () => {
 
  // Clé API OpenWeatherMap
  const apiKey = "19b06fbd1ab2fe28c8e65b8df6588afa";
  // Nom de la Ville
  var city = "paris";

  // Effectue une requête à l'API OpenWeatherMap
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric&lang=fr")
    .then(response => response.json())
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
      document.querySelector(".letitre").textContent = "Météo de "+ ville;
      document.querySelector(".titre").textContent = "Météo de "+ ville;
    })
    .catch(error => {
      console.log('Une erreur s\'est produite :', error);
    });
})
};

// j'apelle la fonction meteo
meteo();
// 60min = 3600000 ms
setInterval(meteo,3600000);




