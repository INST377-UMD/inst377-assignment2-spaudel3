async function createButton() {
    // getting button div
    const buttonDiv = document.getElementById("dogButtons");
    // api url
    const api_url = "https://dogapi.dog/api/v2/breeds"; 
    await fetch(api_url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // creating button element
        let button = document.createElement("button");
        // assigning the name of the dog breed to the button's title
        button.textContent = data.attributes.name.value;
        console.log(data.attributes);
        // when button is clicked...
        // data from the api as a parameter, not sure if that works
        button.addEventListener('click', function whenClicked(data){
            console.log(data);
            // getting dog info container
            const infoDiv = document.getElementById("dogInfo");
            // clearing the container of previous information
            infoDiv.innerHTML = '';
            // creating dog breed name
            const name = document.createElement("name");
            // name of dog breed
            name.textContent = `Name: ${data.attributes.name.value}`;
            const desc = document.createElement("desc");
            desc.textContent = `Description: ${data.attributes.description.value}`;
            const minLife = document.createElement("minLife");
            minLife.textContent = `Min Life: ${data.life.min.value}`;
            const maxLife = document.createElement("maxLife");
            maxLife.textContent = `Max Life: ${data.life.max.value}`;
            infoDiv.appendChild(name);
            infoDiv.appendChild(desc);
            infoDiv.appendChild(minLife);
            infoDiv.appendChild(maxLife);

            // originally thought I would need a for loop, but wasn't sure
            // for each dictionary in the data array
            // data.forEach(item => {
            //     // creating dog breed name
            //     const name = document.createElement("name");
            //     // name of dog breed
            //     name.textContent = `Name: ${item.attributes.name}`;
            //     const desc = document.createElement("desc");
            //     desc.textContent = `Description: ${item.attributes.description}`;
            //     const minLife = document.createElement("minLife");
            //     minLife.textContent = `Min Life: ${item.life.min}`;
            //     const maxLife = document.createElement("maxLife");
            //     maxLife.textContent = `Max Life: ${item.life.max}`;
            // })
        })
        buttonDiv.appendChild(button);
    })
}
// tried doing window.onload because the buttons aren't showing up
// information shows up in the console, but the slider stops working
// also throws a type error related to line 13 (related to name)
// window.onload = createButton;