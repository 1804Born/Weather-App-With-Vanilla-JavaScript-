window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature-degree');
  const temperatureSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longtitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?q=${lat}&lang=${long}1&key=12b92abb557346cb8a2183131242204`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp_f } = data.current;
          const { text } = data.current.condition;
          const { region } = data.location;
          // Set DOM element from th API
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = text;
          locationTimezone.textContent = region;
          // Formular for CELSIUS
          let celsius = (temp_f - 32) * (5 / 9);
          // console.log(data);

          // Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temp_f;
            }
          });
        });
    });
  }
});
