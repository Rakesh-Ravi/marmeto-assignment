const sideContent = document.getElementById("sideContent")
const options = {
    method: "GET"
};
const productData= []


const fetchData = async()=>{
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448', options)
    const data= await response.json()
    const newData= {
        id:data.product.id,
        title:data.product.title,
        description:data.product.description,
        vendor:data.product.vendor,
        productType:data.product.product_type,
        price:parseInt(data.product.price.replace('$', '')),
        compareAtPrice:parseInt(data.product.compare_at_price.replace('$', '')),
        options:data.product.options,
        images:data.product.images
    }

    productData.push(newData)
    //console.log(productData[0])
   
    //to add vendor
    const vendor = document.createElement("p")
    vendor.textContent=productData[0].vendor
    vendor.classList.add("vendor")
    sideContent.appendChild(vendor)
    sideContent.appendChild(document.createElement("hr"));
    //to add title 
    const title = document.createElement("h1")
    title.textContent=productData[0].title
    title.classList.add("title")
    sideContent.appendChild(title)
    sideContent.appendChild(document.createElement("hr"));

    //to calculate discount 
    const price= parseInt(productData[0].price) 
    const compareAtPrice = parseInt(productData[0].compareAtPrice)
    const discount = Math.floor(((compareAtPrice-price)/compareAtPrice)*100 )
    console.log(discount)

    // to add price
    const container = document.createElement("div")
    container.classList.add("price-container")
    const priceEl = document.createElement("h1")
    priceEl.classList.add("price")
    priceEl.textContent="$"+price.toString()+".00"
    container.appendChild(priceEl)

    //to add discount 
    const discountEl = document.createElement("p");
    discountEl.textContent=discount.toString()+"%"+" Off";
    discountEl.classList.add("discount")
    container.appendChild(discountEl)

    sideContent.appendChild(container)
    

    //to add compareatprice 
    const compareEl = document.createElement("h1");
    compareEl.textContent= "$"+compareAtPrice.toString()+".00"
    compareEl.classList.add("compare-price")
    sideContent.appendChild(compareEl)
    sideContent.appendChild(document.createElement("hr"));
    
    //to add color
    const colorDes= document.createElement("p")
    colorDes.textContent="Choose a Color"
    colorDes.classList.add("color-des")
    sideContent.appendChild(colorDes) 

    //to add color list 
    const ColorContainer = document.createElement("div")
    ColorContainer.classList.add("color-container")
    
    const colors = productData[0].options[0].values;

    for (let i = 0; i < colors.length; i++) {
        const colorEl = document.createElement("div");
        const colorName = Object.keys(colors[i])[0]; // Get color name
        const colorValue = colors[i][colorName]; // Get color hex value
        //console.log(typeof(colorValue))
        colorEl.style.backgroundColor = colorValue;
        colorEl.classList.add("color-items-" + colorName.toLowerCase()); 
        if(colorName==="Yellow"){
            const iconContainer= document.createElement("div");

            const iconTick = document.createElement("i");
            iconTick.classList.add("fa-solid", "fa-check");
            iconTick.classList.add("icon-tick")
            iconContainer.appendChild(iconTick)
            iconContainer.classList.add("icon-container")
            colorEl.appendChild(iconContainer)
        }
        colorEl.classList.add("color-items")
        ColorContainer.appendChild(colorEl);
   }
    sideContent.appendChild(ColorContainer)
    sideContent.appendChild(document.createElement("hr"));


    //to add size 
    const sizedes = document.createElement("p")
    sizedes.textContent="Choose a Size";
    sizedes.classList.add("size-des")
    sideContent.appendChild(sizedes)

    const sizeContainer = document.createElement("ul");
    sizeContainer.classList.add("size-container")

    for (let sizeData of productData[0].options[1].values){
          const radioEl= document.createElement("input")
          radioEl.type="radio";
          radioEl.id = sizeData;

          const labelEl= document.createElement("label")
          labelEl.textContent=sizeData;
          labelEl.htmlFor = sizeData;
          labelEl.classList.add("label-text")
          const listEl = document.createElement("li")

          listEl.appendChild(radioEl);
          listEl.appendChild(labelEl);
          listEl.classList.add("size-list-item")
          sizeContainer.appendChild(listEl)
    }
    sideContent.appendChild(sizeContainer)
    

    // cart value
    const cartContainer= document.createElement("div")
    cartContainer.classList.add("cart-container")
    const cartvalueContanier=document.createElement("div")
    cartvalueContanier.classList.add("cart-value-container")
    const cartValue = document.createElement("p")
    cartValue.textContent="1"
    const decrease= document.createElement("p")
    decrease.textContent="-"
    const increase = document.createElement("p")
    increase.textContent="+"

    cartvalueContanier.appendChild(decrease)
    cartvalueContanier.appendChild(cartValue)
    cartvalueContanier.appendChild(increase)
    cartContainer.appendChild(cartvalueContanier)
    
    

    // create add to cart 
    
    const addtoCart = document.createElement("div")
    addtoCart.classList.add("add-to-cart")
     
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-bag-shopping");
    icon.classList.add("icon")
    addtoCart.appendChild(icon);

    const addToCartDes= document.createElement("p")
    addToCartDes.textContent="Add To Cart"
    addToCartDes.classList.add("add-to-cart-des")

    addtoCart.appendChild(addToCartDes)
    
    cartContainer.appendChild(addtoCart)

    sideContent.appendChild(cartContainer)
    sideContent.appendChild(document.createElement("hr"));
    //to add description 
    
    const textContent = productData[0].description;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = textContent;
    descriptionElement.classList.add("description")
    sideContent.appendChild(descriptionElement);
}
fetchData()
