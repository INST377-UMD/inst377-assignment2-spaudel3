var stockPrice = [];
var stockDate = [];
myChart = document.getElementById('lineChart');
// var api_url = "";
// var dropDown = document.getElementById("days");
// console.log(dropDown);

async function createChart() {
    await getStockData();
//Don't need this function
//Need list of dates and list of prices
    
}

// createChart();

async function getStockData() {
    // const currentDate = () => new Date();
    // var dropDown = document.getElementById("days");
    // var dropDownOption = dropDown.value;
    var stockOption = document.getElementById("stockInput").value;

    fromDate = getPriorDate();
    api_url = `https://api.polygon.io/v2/aggs/ticker/${stockOption}/range/1/day/${fromDate}/${currentDate}?sort=asc&apiKey=Qr2qDsgBpBaMQiM8seBZjEhgLKnph7Iy`;
    const response = await fetch(api_url);
    const lineChartData = await response.json();
    console.log(lineChartData);
    // date and price should be in different arrays
    const date = lineChartData.map( (x) => epochToStandard(x.t));
    const price = lineChartData.map( (x) => x.c);
    console.log(date, price);
    stockDate = date;
    stockPrice = price;
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDate,
            datasets: [{
                label: 'Stock Price',
                data: stockPrice
            }]
        }
    });
}

function getPriorDate() {
    const currentDate = new Date();
    if (dropDown.selectedIndex == 0) {
        var priorDate = new Date().setDate(currentDate.getDate() - 30);
    } else if (dropDown.selectedIndex == 1) {
        var priorDate = new Date().setDate(currentDate.getDate() - 60);
    } else if (dropDown.selectedIndex == 2) {
        var priorDate = new Date().setDate(currentDate.getDate() - 90);
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