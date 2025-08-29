const Weathertitle = document.querySelector(".Weathertitle");
const weatherCloud = document.querySelector(".Cloud");
const btnSearch = document.querySelector(".btnSearch");
const inpCity = document.querySelector(".inp");
const todayChild = Array.from(document.querySelectorAll(".today-child"));
const todayCard = document.querySelector(".today-card");
const windChild = document.querySelector(".highlight-child-wind");
const humidChild = document.querySelector(".highlight-child-humidity");


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
  
  const hourly = await getData2(city);
  console.log(hourly);

  todayChild.forEach((card , index) => {
    card.innerHTML = "";
    const cardImg = document.createElement("img");
    const today = document.createElement("p");
    const hourlyTemp = document.createElement("span");
    card.classList.add("today-child");
    
    const imgCon = hourly.list[index].weather.main;
    console.log(imgCon);
    if (imgCon === "Clear") {
      cardImg.src = "./img/image 2.png";
    } else if (imgCon === "Clouds") {
      cardImg.src = "./img/image 3.png";
    } else if (imgCon === "Rain") {
      cardImg.src = "./img/image 4.png";
    } else if (imgCon === "Snow") {
      cardImg.src = "./img/image 5.png";
    } else {
      cardImg.src = "./img/image 2.png";
    }

    const now = new Date();  
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    today.textContent= weekdays[now.getDay()];
    hourlyTemp.classList.add("hourly");

    hourlyTemp.textContent = `${hourly.list[index].main.temp} °C `;

    card.append(cardImg , today , hourlyTemp);   
  });

  Weathertitle.innerHTML = "";
  weatherCloud.innerHTML = "";

  const location = document.createElement("h1");
  location.classList.add("location");
  location.textContent = product.name;

  const country = document.createElement("p");
  country.classList.add("city");
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
  weatherImg.classList.add("cloud-img");

  const avrageTemp = document.createElement("p");
  avrageTemp.classList.add("temp");
  avrageTemp.textContent = `${(product.main.temp - 273.15).toFixed(0)} °C`;

  const temMinMax = document.createElement("p");
  temMinMax.classList.add("location-temp");
  temMinMax.textContent = `${(product.main.temp_max - 273.15).toFixed(0)} / ${(
    product.main.temp_min - 273.15
  ).toFixed(0)} °`;

  Weathertitle.append(location, country);
  weatherCloud.append(weatherImg, avrageTemp, temMinMax);

 const windEls = document.querySelectorAll(".wind-speed");
 windEls.forEach(el => el.remove());


  const windNum = document.createElement("p");
  const kilometer =document.createElement("span");
  kilometer.textContent = "Km/h";
  kilometer.classList.add("km");
  windNum.classList.add("wind-speed");
  windNum.textContent=`${product.wind.speed}`;
  windChild.append(windNum);
  windNum.append(kilometer);


  const humidNum = document.createElement("p");
  const percent =document.createElement("span");
  percent.textContent = "%";
  percent.classList.add("km");
  humidNum.classList.add("wind-speed");
  humidNum.textContent=`${product.main.humidity}`
  humidChild.append(humidNum);
  humidNum.append(percent);

 
}

async function getData2(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${"2a2198916724cc75c8b407155201aa59"}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

