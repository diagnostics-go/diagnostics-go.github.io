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

display_products = (products, id) => {
    // Always require a div container with the id 'products'
    let product_div = document.getElementById(id);
    for (let product of products){
        let responsive_div = document.createElement("div");
        responsive_div.classList.add("col-10", "col-lg-3", "my-3");
        if (id == "all"){
            responsive_div.appendChild(create_product_card(
                product.company,
                product.name,
                product.disposables,
                product.area,
                product.subareas,
                product.tests
            ));
            product_div.appendChild(responsive_div);
        }
        if (product.area == "Point of Care" && id == "pointofcare"){
            responsive_div.appendChild(create_product_card(
                product.company,
                product.name,
                product.disposables,
                product.area,
                product.subareas,
                product.tests
            ));
            product_div.appendChild(responsive_div);
        }
        if (product.area == "Labor" && id == "labor"){
            responsive_div.appendChild(create_product_card(
                product.company,
                product.name,
                product.disposables,
                product.area,
                product.subareas,
                product.tests
            ));
            product_div.appendChild(responsive_div);
        }
    }
    return true;
}
