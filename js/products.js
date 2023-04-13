/* 
This file contains all the code to generate and create the elements of products inside the page
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.0.1
*/

create_product_card = (brand, product_name, disposables, area, subareas, tests) => {
    let parent_card = document.createElement("div");
    parent_card.classList.add("card");

    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    parent_card.appendChild(card_body);
    
    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = brand + " " + product_name;
    card_body.appendChild(title);

    let description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = disposables;
    card_body.appendChild(description);

    badges = [area];
    badges = badges.concat(subareas.slice(0,3), tests.slice(0,3));
    for (let idx in badges){
        let categories = document.createElement("span");
        categories.classList.add("badge", "rounded-pill", "text-wrap", "m-1");
        if (idx == 0){
            categories.classList.add("text-bg-success");
        }
        else if (idx > 0 && idx < subareas.slice(0,3).length + 1){
            categories.classList.add("text-bg-warning");
        }
        else{
            categories.classList.add("text-bg-info");
        }
        categories.textContent = badges[idx];
        card_body.appendChild(categories);
    }
    return parent_card;
}

display_products = (products) => {
    // Always require a div container with the id 'products'
    console.log(products.length);
    let product_div = document.getElementById('search-panel');

    let row = document.createElement("div");
    let col = document.createElement("div");
    let container = document.createElement("div");
    let outline = document.createElement("div");
    row.classList.add("row", "justify-content-center");
    col.classList.add("col-10");
    container.classList.add("container-fluid");
    outline.classList.add("row", "align-items-top", "justify-content-center");
    outline.id = 'products';
    
    row.appendChild(col);
    col.appendChild(container);

    for (let product of products){
        let responsive_div = document.createElement("div");
        responsive_div.classList.add("col-10", "col-lg-3", "my-3");
        responsive_div.appendChild(create_product_card(
            product.company,
            product.name,
            product.disposables,
            product.area,
            product.subareas,
            product.tests
        ));
        outline.appendChild(responsive_div);
    }
    container.appendChild(outline);
    product_div.appendChild(row);
    return true;
}