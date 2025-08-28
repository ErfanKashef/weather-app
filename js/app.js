const Weathertitle = document.querySelector(".Weathertitle")
const weatherCloud = document.querySelector(".Cloud")
async function getData(city = "tehran") {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"2a2198916724cc75c8b407155201aa59"}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
const btnSearch = document.querySelector('.btnSearch');
const inpCity = document.querySelector('.title-inp');
btnSearch.addEventListener('click', () => {
    const city = inpCity.value
    createData(city)

} )

async function createData(city){
    const product = await getData(city);
    console.log(product)
    Weathertitle.innerHTML = "";
    weatherCloud.innerHTML="";
    const locition = document.createElement("h1");
    const country =document.createElement('p');
    const avrageTemp = document.createElement('p');
    avrageTemp.textContent = product.main.temp;
    country.textContent= product.sys.country;
    locition.textContent = product.name;
    Weathertitle.append(locition ,country);
    weatherCloud.append(avrageTemp)

}
createData()
