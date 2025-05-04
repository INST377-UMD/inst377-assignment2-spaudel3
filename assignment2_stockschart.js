let myChart;

async function getStockData() {
    ctx = document.getElementById('lineChart');
    var stockPrice = [];
    var stockDate = [];
    var stockOption = document.getElementById("stockInput").value;
    const stockUpper = stockOption.toLocaleUpperCase();
    const stockReformat = stockUpper.replace(/\s/g, '');
    console.log(stockUpper);
    console.log(typeof stockUpper);
    console.log(typeof stockOption);
    console.log(stockOption);
    // var stockUppercase = stockOption.toUppercase();
    bothDates = getDates();
    api_url = `https://api.polygon.io/v2/aggs/ticker/${stockReformat}/range/1/day/${bothDates[1]}/${bothDates[0]}?sort=asc&apiKey=Qr2qDsgBpBaMQiM8seBZjEhgLKnph7Iy`;
    console.log(api_url);
    const response = await fetch(api_url);
    const lineChartData = await response.json();
    console.log(lineChartData);
    const data = lineChartData.results;
    console.log(data);
    data.forEach((item) => stockDate.push(new Date(item.t).toLocaleDateString()));
    data.forEach((item) => stockPrice.push(item.c));
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