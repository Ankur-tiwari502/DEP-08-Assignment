const products = [
{ 
    id: 1, name: "Widget", price: 50, quantity: 120 
}, 
{ 
    id: 2, name: "Gadget", price: 30, quantity: 80 
}, 
{ 
    id: 3, name: "Doohickey", price: 100, quantity: 200 
}, 
{ 
    id: 4, name: "Thingamajig", price: 75, quantity: 90 
}
];
console.log(products);

// Map
products.map((product)=> {
    if(product.quantity >100){
        product.price = product.price - 1/10 * product.price;
    }
})
console.log("After applying map",products);

// Filter
const arr1 = products.filter((product)=>  product.quantity>100 )
console.log("After applying filter new arr1 = ",arr1);

// forEach
products.forEach((product)=> {
    if (product.quantity>100) {
        console.log(product.name, product.price);
    } 
})

