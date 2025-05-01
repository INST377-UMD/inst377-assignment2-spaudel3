let myChart;

async function getStockData(stock) {
    // const currentDate = () => new Date();
    // var dropDown = document.getElementById("days");
    // var dropDownOption = dropDown.value;
    ctx = document.getElementById('lineChart');
    var stockPrice = [];
    var stockDate = [];
    var stockOption = stock.value;
    bothDates = getDates();
    api_url = `https://api.polygon.io/v2/aggs/ticker/${stockOption}/range/1/day/${bothDates[1]}/${bothDates[0]}?sort=asc&apiKey=Qr2qDsgBpBaMQiM8seBZjEhgLKnph7Iy`;
    console.log(api_url);
    const response = await fetch(api_url);
    const lineChartData = await response.json();
    const data = lineChartData.results
    console.log(data);
    data.forEach((item) => stockDate.push(new Date(item.t).toLocaleDateString()));
    data.forEach((item) => stockPrice.push(item.c));
    // date and price should be in different arrays
    // const date = lineChartData.map( (x) => epochToStandard(x.t));
    // const price = lineChartData.map( (x) => x.c);
    console.log(stockDate, stockPrice);
    
    if (myChart) {
        myChart.destroy();
    }
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

function getDates() {
    var currentDate = new Date();
    // added dropDown here, not sure if I need it
    var dropDown = document.getElementById("days");
    if (dropDown.selectedIndex == 0) {
        var priorDate = new Date().setDate(currentDate.getDate() - 30);
    } else if (dropDown.selectedIndex == 1) {
        var priorDate = new Date().setDate(currentDate.getDate() - 60);
    } else if (dropDown.selectedIndex == 2) {
        var priorDate = new Date().setDate(currentDate.getDate() - 90);
    }
    newCurrentDate = currentDate.getTime();
    return [epochToStandard(newCurrentDate), epochToStandard(priorDate)];
}

function epochToStandard(int) {
    console.log(int);
    var epochDate = new Date(int);
    console.log(epochDate);
    var year = epochDate.getFullYear();
    console.log(year);
    var month = (epochDate.getMonth() + 1).toString().padStart(2, '0');
    console.log(month);
    var day = epochDate.getDate().toString().padStart(2, '0');
    console.log(day);
    var reformatedDate = year + "-" + month + "-" + day;
    console.log(reformatedDate);
    return reformatedDate;
}