let weather = {
    apiKey: "67b92f0af5416edbfe58458f502b0a31",
    fetchWeather: function (city) {
      document.querySelector(".weather").classList.add("loading");
      document.querySelector(".loader").style.display = "block";
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.querySelector(".loader").style.display = "none";
      
      // Use a specific image URL based on weather description
      let backgroundImageUrl = this.getBackgroundImageUrl(description);
      document.body.style.backgroundImage = "url('" + backgroundImageUrl + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
    getBackgroundImageUrl: function (description) {
      switch (description.toLowerCase()) {
        case "clear sky":
          return "https://source.unsplash.com/1600x900/?clear,sky,sun";
        case "few clouds":
          return "https://source.unsplash.com/1600x900/?few,clouds";
        case "scattered clouds":
          return "https://source.unsplash.com/1600x900/?scattered,clouds";
        case "broken clouds":
          return "https://source.unsplash.com/1600x900/?broken,clouds";
        case "shower rain":
          return "https://source.unsplash.com/1600x900/?shower,rain";
        case "rain":
          return "https://source.unsplash.com/1600x900/?rain";
        case "thunderstorm":
          return "https://source.unsplash.com/1600x900/?thunderstorm";
        case "snow":
          return "https://source.unsplash.com/1600x900/?snow";
        case "mist":
          return "https://source.unsplash.com/1600x900/?mist";
        case "thunderstorm with light rain":
        case "thunderstorm with rain":
        case "thunderstorm with heavy rain":
          return "https://source.unsplash.com/1600x900/?thunderstorm,rain";
        case "light thunderstorm":
        case "heavy thunderstorm":
        case "ragged thunderstorm":
          return "https://source.unsplash.com/1600x900/?thunderstorm";
        case "thunderstorm with light drizzle":
        case "thunderstorm with drizzle":
        case "thunderstorm with heavy drizzle":
          return "https://source.unsplash.com/1600x900/?thunderstorm,drizzle";
        case "light intensity drizzle":
        case "drizzle":
        case "heavy intensity drizzle":
        case "light intensity drizzle rain":
        case "drizzle rain":
        case "heavy intensity drizzle rain":
        case "shower rain and drizzle":
        case "heavy shower rain and drizzle":
        case "shower drizzle":
          return "https://source.unsplash.com/1600x900/?drizzle";
        case "light rain":
        case "moderate rain":
        case "heavy intensity rain":
        case "very heavy rain":
        case "extreme rain":
        case "freezing rain":
        case "light intensity shower rain":
        case "heavy intensity shower rain":
        case "ragged shower rain":
          return "https://source.unsplash.com/1600x900/?rain";
        case "light snow":
        case "snow":
        case "heavy snow":
        case "sleet":
        case "light shower sleet":
        case "shower sleet":
        case "light rain and snow":
        case "rain and snow":
        case "light shower snow":
        case "shower snow":
        case "heavy shower snow":
          return "https://source.unsplash.com/1600x900/?snow";
        case "smoke":
          return "https://source.unsplash.com/1600x900/?smoke";
        case "haze":
          return "https://source.unsplash.com/1600x900/?haze";
        case "dust":
        case "sand":
          return "https://source.unsplash.com/1600x900/?dust";
        case "fog":
          return "https://source.unsplash.com/1600x900/?fog";
        case "sand/ dust whirls":
          return "https://source.unsplash.com/1600x900/?sand,dust,whirls";
        case "volcanic ash":
          return "https://source.unsplash.com/1600x900/?volcanic,ash";
        case "squalls":
          return "https://source.unsplash.com/1600x900/?squalls";
        case "tornado":
          return "https://source.unsplash.com/1600x900/?tornado";
        default:
          return "https://source.unsplash.com/1600x900/?weather";
      }
    }
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  // Fetch weather for Kochi on initial load
  weather.fetchWeather("Kochi");
  