async function getTop() {
    var sorted = []
    const api_url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    data.sort((a, b) => b.value - a.value);
    console.log(data);
    const top = data.slice(0, 5);
    console.log(top);
    return top;
}

async function populateTable() {
    topFive = await getTop();
    var tbody = document.getElementById("tbody");
    var table = document.getElementById("table");
    topFive.forEach((item) => {
        const row = document.createElement("tr");
        const tickCell = document.createElement("td");
        const tickLink = document.createElement("a");
        const stockUrl = `https://finance.yahoo.com/quote/${item.ticker}`
        tickLink.setAttribute('href', stockUrl);
        tickLink.target = '_blank';
        tickLink.textContent = item.ticker;
        console.log(tickCell);
        tickCell.appendChild(tickLink);
        row.appendChild(tickCell);
        const countCell = document.createElement("td");
        countCell.textContent = item.no_of_comments;
        row.appendChild(countCell);
        const sentimentCell = document.createElement("td");
        sentimentCell.textContent = item.sentiment;
        const sentimentIcon = document.createElement("img");
        if (sentimentCell.textContent === "Bullish") {
            sentimentIcon.src = "https://img.freepik.com/premium-vector/bull-climbs-up-bullish-growth-graph-stock-market_186444-316.jpg";
            sentimentIcon.style.width = "200px";
            sentimentIcon.style.height = "200px";
        } else if (sentimentCell.textContent === "Bearish") {
            sentimentIcon.src = "https://cdni.iconscout.com/illustration/premium/thumb/man-fighting-with-stock-market-bearish-run-illustration-download-in-svg-png-gif-file-formats--loss-trader-broker-anxious-business-and-finance-pack-illustrations-3793611.png";
            sentimentIcon.style.width = "200px";
            sentimentIcon.style.height = "200px";
        }
        row.appendChild(sentimentIcon);
        tbody.appendChild(row);
    })
    console.log(tbody);
    table.appendChild(tbody);
}

populateTable();