async function getTop() {
    var sorted = []
    const api_url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
    const response = await fetch(api_url);
    const data = await response.json();
    // use for each to create table and use a const to hold index
    // append every ticket, count, and sentiment in a for each loop at the end
    // don't need multiple functions
    console.log(data);
    // this sort doesn't work, double check the logic
    data.sort((a, b) => b.value - a.value);
    console.log(data);
    const top = data.slice(0, 5);
    console.log(top);
    return top;
}

async function populateTable() {
    topFive = await getTop();
    // loop through array of dictionaries, take element and append it to tbody
    var tbody = document.getElementById("tbody");
    var table = document.getElementById("table");
    topFive.forEach((item) => {
        const row = document.createElement("tr");
        const tickCell = document.createElement("td");
        tickCell.textContent = item.ticker;
        row.appendChild(tickCell);
        const countCell = document.createElement("td");
        countCell.textContent = item.no_of_comments;
        row.appendChild(countCell);
        const sentimentCell = document.createElement("td");
        sentimentCell.textContent = item.sentiment;
        row.appendChild(sentimentCell);
        tbody.appendChild(row);
    })
    console.log(tbody);
    replaceSentiment(tbody);
    table.appendChild(tbody);
}

function replaceSentiment(body) {
    var list = body.getElementById("td");
    let bearishImg = new Image();
    bearishImg.src = "https://cdni.iconscout.com/illustration/premium/thumb/man-fighting-with-stock-market-bearish-run-illustration-download-in-svg-png-gif-file-formats--loss-trader-broker-anxious-business-and-finance-pack-illustrations-3793611.png";
    let bullishImg = new Image();
    bullishImg.src = "https://img.freepik.com/premium-vector/bull-climbs-up-bullish-growth-graph-stock-market_186444-316.jpg";
    body.forEach((element) => {
        if (element.getElementById("td") == "Bearish") {
            element.getElementById("td").innerHTML = bearishImg;
        } else if (element.getElementById("td") == "Bullish") {
            element.getElementById("td").innerHTML = bullishImg;
        }
    })
}

populateTable();