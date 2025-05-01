async function getTop() {
    var sorted = []
    const api_url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
    const response = await fetch(api_url);
    const data = await response.json();
    // use for each to create table and use a const to hold index
    // append every ticket, count, and sentiment in a for each loop at the end
    // don't need multiple functions
    console.log(data);
    data.forEach((item) => item.sort((a, b) => b[1] - a[1]));
    console.log(data);
    top = data.slice(0, 4);
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
    table.appendChild(tbody);
    
    // for (let i = 0; i < topFive.length; i++) {
    //     var currentTick = topFive[i].ticker;
    //     var currentCount = topFive[i].no_of_comments;
    //     var currentSentiment = topFive[i].sentiment;

    // }
}
// document.getElementById("firstTick").innerHTML = `${top.ticker.value}`