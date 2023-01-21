/* 
This file contains all the code to generate and create the elements of products inside the page
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 0.0.1
*/

create_product_card = (brand, product_name, disposables, badges) => {
    let parent_card = document.createElement("div");
    parent_card.classList.add("card");

    let img = document.createElement("img");
    img.src = "/gray_img.png";
    img.classList.add("card-img-top", "d-none", "d-lg-flex");
    img.style.maxHeight = "20vh";

    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    
    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = brand + " " + product_name;
    card_body.appendChild(title);

    let description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = disposables;
    card_body.appendChild(description);

    for (let categorie of badges){
        let categories = document.createElement("span");
        categories.classList.add("badge", "text-bg-success");
        categories.textContent = categorie;
        card_body.appendChild(categories);
    }
}

