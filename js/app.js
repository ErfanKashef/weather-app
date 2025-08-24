async function getData() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${"tehran"}&appid=${"2a2198916724cc75c8b407155201aa59"}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("error");
  }
}
getData();
// async function createData(){
//     const product = await getData();

//     product.forEach((product) => {
//         console.log(product)

//     });
// }
// createData()
