
const input = document.getElementById("country");
const btn = document.getElementById("btn-country");

function fetchData(url) {
  document.getElementById("covid-data").innerHTML = "Loading data";
  return fetch(url).then((response) => {
    return response.json();
  });
}

btn.addEventListener("click", async() => {
  if (input.value) {
    const valueCountry = input.value.toLowerCase();
    const covidData = await getTodaysCovidData(valueCountry)
    renderData(covidData);
  }
});


function resetView() {
  document.querySelector("#main").innerHTML = `
    <div id="covid-data" class="visible"></div>
    <div id="country-map" class="map"></div>
  `;
}
function renderData(data) {
  console.log(data);
  resetView();
  const covidData = data.response[0];
  if (covidData) {
  const covidDataHtml = `
    <h1>${covidData.country}</h1>
    <h3>${covidData.day}</h3>
    <table>
      <tbody>
        <tr>
          <td>New cases</td>
          <td>${covidData.cases.new}</td>
        </tr>
        <tr>
          <td>New deaths</td>
          <td>${covidData.deaths.new}</td>
        </tr>
        <tr>
          <td>Total deaths</td>
          <td>${covidData.deaths.total}</td>
        </tr>
        <tr>
         <td>Critical cases</td>
         <td>${covidData.cases.critical}</td>
        </tr>
        <tr>
          <td>Active cases</td>
          <td>${covidData.cases.active}</td>
        </tr>
        <tr>
          <td>Recovered cases</td>
          <td>${covidData.cases.recovered}</td>
        </tr>
        <tr>
          <td>Population</td>
          <td>${covidData.population}</td>
        </tr>
      </tbody>
    </table>
  `;
  document.querySelector("#covid-data").innerHTML = covidDataHtml;
 
  const countryHtml = `
    <div style="width: 100%">
      <iframe width="500" height="300" src="https://maps.google.com/maps?q=${covidData.country}&t=&z=4&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    </div>
  `
  document.querySelector("#country-map").innerHTML = countryHtml;
}else {
  const errorHtml = `
    <h1>Wrong country name</h1>
  `;
  document.querySelector("#main").innerHTML = errorHtml;
}

 
  
}

async function getTodaysCovidData(country) {
    try {
      const response = await fetch(
        `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
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
      //console.log("respondedWithAwait", covidData);
      return covidData;
    } catch (err) {
      console.log(err);
    }
  }
  
 

    
  