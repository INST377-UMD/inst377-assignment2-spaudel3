const api_url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
async function getTop() {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    // for ()
}