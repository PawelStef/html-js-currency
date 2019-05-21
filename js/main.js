const CHART = document.getElementById("lineChart");
console.log(CHART);
let lineChart = new Chart(CHART, {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August"],

    datasets: [
      {
        label: "My First dataset",
        //linia
        //borderDash: [3, 3], //jezeli ustawione to przerywana linia
        borderColor : 'rgba(8,72,134,0.5)',
        pointBorderColor : 'rgba(8,72,134,0.5)',
        borderWidth : 2,
        lineTension: 0.1,
        //kolor tla i legendy
        fill: true, //czy wypelnic zbior
        backgroundColor : 'rgba(114,207,220,0.1)', //wplywa tez na kolor w legendzie
        //ustawienia punktu
        pointRadius : 1,
        pointBorderWidth : 1,
        pointBackgroundColor : 'rgba(255,255,255,1)',
        //ustawienia punktu hover
        pointHoverRadius: 1,
        pointHoverBorderWidth: 5,
        pointHoverBackgroundColor : 'rgba(255,255,255,1)',
        pointHoverBorderColor : 'rgba(236,115,87, 1)',
        data: [4.57, 4.15, 3.87, 3.74, 4.06, 4.09, 4.28, 4.12],
      }
    ]
  },
  options:{
    scales:{
      yAxes: [{
        ticks:{
         // beginAtZero: true
        }
      }]
    },
    legend: {
      position : "bottom"
    }
  }
});
