var stockPrice = [];
var stockDate = [];
const ctx = document.getElementById('lineChart')
var api_url = "";
const currentDate = new Date();
var dropDown = document.getElementById("days");
var stockOption = document.getElementById("stockInput");
new Chart(ctx, {
    type: 'line',
    data: {
        labels: stockDate,
        datasets: [{
            label: 'Stock Price',
            data: stockPrice
        }]
    }
});

async function getStockData() {
    // const currentDate = () => new Date();
    // var dropDown = document.getElementById("days");
    // var dropDownOption = dropDown.value;
    fromDate = getPriorDate();
    api_url = `https://api.polygon.io/v2/aggs/ticker/${stockOption}/range/1/day/${fromDate}/${currentDate}?sort=asc&apiKey=Qr2qDsgBpBaMQiM8seBZjEhgLKnph7Iy`;
    const response = await fetch(api_url);
    const lineChartData = await response.json();
    console.log(lineChartData);
    const date = lineChartData.data.map( (x) => epochToStandard(x.t));
    const price = lineChartData.data.map( (x) => x.c);
    console.log(date, price);
    stockDate = date;
    stockPrice = price;
}

function getPriorDate() {
    // const currentDate = new Date();
    if (dropDown[index] == 0) {
        var priorDate = new Date().setDate(today.getDate() - 30);
    } else if (dropDown[index] == 1) {
        var priorDate = new Date().setDate(today.getDate() - 60);
    } else if (dropDown[index] == 2) {
        var priorDate = new Date().setDate(today.getDate() - 90);
    }
    return priorDate;
}

function epochToStandard(int) {
    var epochDate = new Date(int*1000);
    var year = epochDate.getFullYear();
    var month = epochDate.getMonth() + 1;
    var day = epochDate.getDate();
    var reformatedDate = year + "-" + month + "-" + day;
    console.log(reformatedDate);
    return reformatedDate;
}