// Define the weather object
const weather = {
  // API key for OpenWeatherMap
  apiKey: "ecbb3886f8f6f83258d1cae670ce6cde",
  // Fetch weather data for the given location
  fetchWeather: function (location) {
    // Construct the API URL with the location and API key
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      location + "&units=metric&appid=" + this.apiKey;
    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the response is not successful
        if (!response.ok) {
          // Display an error message and throw an error
          alert("Can't find weather data for the location.");
          throw new Error("Can't find weather data.");
        }
        // If the response is successful, parse the JSON data
        return response.json();
      })
      .then((data) => {
        // Call the displayWeather function with the retrieved data
        this.displayWeather(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.log(error);
      });
  },

  // Display weather data on the UI
  displayWeather: function (data) {
    // Extract necessary data from the response object
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // Update the UI elements with the retrieved data
    document.querySelector(".location").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  // Perform a search for weather data
  search: function () {
    const searchValue = document.querySelector(".s-bar").value;
    this.fetchWeather(searchValue);
  },
};

// Attach event listener to the search button
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Attach event listener to the search bar to trigger search on "Enter" key press
document.querySelector(".s-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Fetch weather data for a specific location (e.g., "Denver")
weather.fetchWeather("Madrid");
