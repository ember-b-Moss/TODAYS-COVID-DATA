let url = "";
const input = document.getElementById("city");
const btn = document.getElementById("btn-city");

function fetchData(url) {
  document.getElementById("covid-data").innerHTML = "Loading data";
  return fetch(url).then((response) => {
    return response.json();
  });
}

btn.addEventListener("click", () => {
  if (input.value) {
    const valueCity = input.value.toLowerCase();
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      valueCity +
      "&appid=9ebe0b81616081651a65b03e4c5c4088";
    fetchData(url).then((data) => renderData(data));
  }
});


function resetView() {
  const resultsDiv = document.querySelector("#main");
  resultsDiv.innerHTML = "";
  const div = document.createElement("div");
  div.id = "covid-data";
  resultsDiv.appendChild(div);
}
 
function renderData(data) {
  resetView();

  const div = document.getElementById("covid-data");
  div.className = "visible";

  //The chosen city
  const cityName = document.createElement("h1");
  div.appendChild(cityName);

  if (data.name === undefined) cityName.innerHTML = "Wrong city name";
  else cityName.innerHTML = data.name;

  //new cases
  const pNewCases = document.createElement("p");
  div.appendChild(pNewCases);
  pNewCases.innerHTML = `New cases: ${data.response.cases.new}`;

  //active cases
  const pActivecases = document.createElement("p");
  div.appendChild(pActivecases);
  pActivecases.innerHTML = `Active cases: ${data.response.cases.active}`;

  //critical
  const pCriticalCases = document.createElement("p");
  div.appendChild(pCriticalCases);
  pCriticalCases.innerHTML = `Critical cases: ${data.response.cases.critical}`;

  //recovered
  const pRecoveredCases = document.createElement("p");
  div.appendChild(pRecoveredCases);
  pRecoveredCases.innerHTML = `Recovered cases: ${data.response.cases.recovered}`;

  //new deaths
  const pNewDeaths = document.createElement("p");
  div.appendChild(pNewDeaths);
  pNewDeaths.innerHTML = `New deaths: ${data.response.deaths.new}`;

  //total deaths
  const pTotalDeaths = document.createElement("p");
  div.appendChild(pTotalDeaths);
  pTotalDeaths.innerHTML = `Total deaths: ${data.response.deaths.total}`;
 
  //a map showing where the city is located
  const mainDiv = document.getElementById("main");
  const mapDiv = document.createElement("div");
  mapDiv.classList.add = "map";
  mainDiv.appendChild(mapDiv);
  mapDiv.innerHTML = `<div style="width: 100%"><iframe width="500" height="300" src="https://maps.google.com/maps?q=${data.name}&t=&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div>`;
}

async function getTodaysCovidDataAwait() {
    try {
      const response = await fetch(
        "https://covid-193.p.rapidapi.com/statistics?country=Denmark",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key":
              "648fc0d332mshda822f4d5f06c4dp1daa64jsn4f8cef537552",
          },
        }
      );
      const covidData = await response.json();
      console.log("respondedWithAwait", covidData);
      return covidData;
    } catch (err) {
      console.log(err);
    }
  }
  
  function timedData() {
    setTimeout(() => {
      
      getTodaysCovidDataAwait();
    }, 3000);
  }
  timedData();
  