const add = (x, y) => +x + +y



//curent rate
function realTimeExcangeRate ()  {
  const url = '*/curentDataJSON';
  console.log(url);
  $.getJSON(url, function (data) {
    console.log(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
    const wart = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
if (wart == 55495.62000000){
return true;
}else {
  return false;
}
  })

}



module.exports = { add, realTimeExcangeRate }

