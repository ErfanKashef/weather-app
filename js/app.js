const Weathertitle = document.querySelector(".Weathertitle");
const weatherCloud = document.querySelector(".Cloud");
const btnSearch = document.querySelector(".btnSearch");
const inpCity = document.querySelector(".inp");

async function getData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"2a2198916724cc75c8b407155201aa59"}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

btnSearch.addEventListener("click", () => {
  const city = inpCity.value.trim();
  createData(city);
});

async function createData(city) {
  const product = await getData(city);
  console.log(product);

  Weathertitle.innerHTML = "";
  weatherCloud.innerHTML = "";

  const location = document.createElement("h1");
  location.classList.add('location');
  location.textContent = product.name;

  const country = document.createElement("p");
  country.classList.add('city');
  country.textContent = product.sys.country;

  const weatherImg = document.createElement("img");
  const condition = product.weather[0].main;
  if (condition === "Clear") {
  weatherImg.src = "./img/image 2.png";
  } else if (condition === "Clouds") {
  weatherImg.src = "./img/image 3.png";
  } else if (condition === "Rain") {
  weatherImg.src = "./img/image 4.png";
  } else if (condition === "Snow") {
  weatherImg.src = "./img/image 5.png";
  } else {
  weatherImg.src = "./img/image 2.png";
  }
  weatherImg.classList.add('cloud-img')


  const avrageTemp = document.createElement("p");
  avrageTemp.classList.add("temp");
  avrageTemp.textContent = `${(product.main.temp - 273.15).toFixed(0)} °C`;
  
  const temMinMax =document.createElement("p");
  temMinMax.classList.add("location-temp");
  temMinMax.textContent = `${(product.main.temp_max - 273.15).toFixed(0)} / ${(product.main.temp_min - 273.15).toFixed(0)} °`;

  Weathertitle.append(location, country);
  weatherCloud.append(weatherImg,avrageTemp , temMinMax);
}