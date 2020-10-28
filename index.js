
const input = document.getElementById("country");
const btn = document.getElementById("btn-country");
const colors = [
  {code:'#007516', label:'very low'},
  {code:'#0b5db3', label:'low'}, 
  {code:'#8c5340', label:'medium'},
  {code:'#ad05a7', label:'high'},
  {code:'#a50000', label:'very high'} 
]

const getCountryColor = ({newInfections, population}) => {
  const infectionRate = newInfections * 1000000 / population
  // New infections per 1M people:
    // Green 1-71
    // Yellow 72-143
    // Orange 144-214
    // Red 215-286
    // Dark red 287+
  if (infectionRate <= 71) {
    return colors[0].code;
  }
  if (infectionRate <= 143) {
    return colors[1].code;
  }
  if (infectionRate <= 214) {
    return colors[2].code;
  }
  if (infectionRate <= 286) {
    return colors[3].code;
  }
  return colors[4].code;
}

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
    const countryColorCode = getCountryColor({
      newInfections: Number(covidData.cases.new),
      population: covidData.population
    })
    const covidDataHtml = `
      <h1>${covidData.country}</h1>
      <h3>${covidData.day}</h3>
      <div class="legend">
        <table class="colorTable">
          <tbody>

          ${displayLegendTableRows()}

          </tbody>
        </table>
      </div>
      <table class="dataTable">
        <tbody>
          <tr>
            <th>New cases</th>
            <td style="color: ${countryColorCode}">${covidData.cases.new}</td>
          </tr>
          <tr>
            <th>New deaths</th>
            <td>${covidData.deaths.new}</td>
          </tr>
          <tr>
            <th>Critical cases</th>
            <td>${covidData.cases.critical}</td>
          </tr>
          <tr>
            <th>Active cases</th>
            <td>${covidData.cases.active}</td>
          </tr>
          <tr>
            <th>Recovered cases</th>
            <td>${covidData.cases.recovered}</td>
          </tr>
          <tr>
            <th>Total deaths</th>
            <td>${covidData.deaths.total}</td>
          </tr>
          <tr>
            <th>Population</th>
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

 
function displayLegendTableRows() {
  
return colors.map(color => ` 
  <tr>
    <th><div style="background: ${color.code};" class="color-box"></div></th>
    <td>${color.label}</td>
  </tr>
`).join('');

}  
    
