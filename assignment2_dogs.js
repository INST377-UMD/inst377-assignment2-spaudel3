async function getImage() {
    const div = document.getElementById("imageSlider");
    await fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.message.forEach((item) => {
            let image = document.createElement("img");
            image.src = item;
            image.width = 300;
            image.height = 300;
            div.appendChild(image);
        })
        
    })
    simpleslider.getSlider();
    createButton();
}

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
        // assigning the name of the dog breed to the button's title
        data.data.forEach((item) => {
            let button = document.createElement("button");
            button.textContent = item.attributes.name;
            button.id = item.attributes.name;
            button.value = item.attributes.name;
            button.addEventListener('click', function whenClicked(){
                // getting dog info container
                const infoDiv = document.getElementById("dogInfo");
                // clearing the container of previous information
                infoDiv.innerHTML = '';
                // creating dog breed name
                const name = document.createElement("p");
                // name of dog breed
                name.textContent = `Name: ${item.attributes.name}`;
                const desc = document.createElement("p");
                desc.textContent = `Description: ${item.attributes.description}`;
                const minLife = document.createElement("p");
                minLife.textContent = `Min Life: ${item.attributes.life.min}`;
                const maxLife = document.createElement("p");
                maxLife.textContent = `Max Life: ${item.attributes.life.max}`;
                infoDiv.appendChild(name);
                infoDiv.appendChild(desc);
                infoDiv.appendChild(minLife);
                infoDiv.appendChild(maxLife);
            })
            buttonDiv.appendChild(button);
        })
        // when button is clicked...
        // data from the api as a parameter, not sure if that works

        
    })
}
// tried doing window.onload because the buttons aren't showing up
// information shows up in the console, but the slider stops working
// also throws a type error related to line 13 (related to name)
// window.onload = createButton;