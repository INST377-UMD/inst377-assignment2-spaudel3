async function getTop() {
    var sorted = []
    const api_url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
    const response = await fetch(api_url);
    const data = await response.json();
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
    topFive.forEach((item) => )
}
document.getElementById("firstTick").innerHTML = `${top.ticker.value}`