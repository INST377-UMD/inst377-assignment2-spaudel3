async function getImage() {
    const div = document.getElementById("imageSlider");
    await fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.message.forEach((item) => {
            let image = document.createElement("img");
            image.src = item;
            image.width = 612;
            image.height = 612;
            div.appendChild(image);
        })
        
    })
    simpleslider.getSlider();
    createButton();
}

async function createButton() {
    // getting button div
    const buttonDiv = document.getElementById("dogButtons");
    const infoDiv = document.getElementById("dogInfo");
    infoDiv.style.visibility = 'hidden';
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
            button.setAttribute("class", "button-23");
            button.textContent = item.attributes.name;
            button.id = item.attributes.name;
            button.value = item.attributes.name;
            button.addEventListener('click', function whenClicked(){
                infoDiv.style.visibility = 'visible';
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
    })
}