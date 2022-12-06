import React, { createContext, useEffect, useState } from "react";
import Client from 'shopify-buy';


const ShopContext = createContext();

const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN_URL,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_API_TOKEN
});


const ShopProvider = props => {

    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [checkout, setCheckout] = useState();
    const [checkoutURL, setCheckoutURL] = useState();
    const [lineitems, setLineItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        var checkout = JSON.parse(localStorage.getItem("checkout"));
        if (checkout) {
            fetchCheckout(checkout.id);
        } else {
            createCheckout();
        }

    }, []);


    const createCheckout = async () => {
        const checkout = await client.checkout.create();
        localStorage.setItem("checkout", JSON.stringify(checkout));
        setCheckout(checkout);
        console.log(checkout);

    }
    const fetchCheckout = async (checkoutId) => {
        console.log("fetchCheckOut", checkoutId);
        const checkout = await client.checkout.fetch(checkoutId);
        console.log("checkout Weburl", checkout.webUrl);
        setCheckoutURL(checkout.webUrl);
        setLineItems(checkout.lineItems);
        setCheckout(checkout);
        console.log("updated", checkout);
    }

    const addItemToCheckout = async (variantId, quantity) => {
        console.log("variant_id = ", variantId, "quantity = ", quantity);
        const lineItemsToAdd = [
            {
                variantId: variantId,
                quantity: 1,
                // customAttributes: [{ key: "MyKey", value: "MyValue" }]
            }
        ];
        // Add an item to the checkout
        var checkouts = JSON.parse(localStorage.getItem("checkout"));
        const checkout = await client.checkout.addLineItems(checkouts.id, lineItemsToAdd);
        console.log("added cart", checkout);
        window.location.reload();
    }
    const removeLineItem = async (id) => {

        var checkouts = JSON.parse(localStorage.getItem("checkout"));
        console.log("Variant Id", id, "Checkout Id", checkouts.id);
        const removeLineItem = await client.checkout.removeLineItems(checkouts.id, id);
        console.log("remove line item", removeLineItem);
        window.location.reload();

    }
    const fetchAllProducts = async () => {

        const allproduct = await client.product.fetchAll();
        setProducts(allproduct);
    }

    const fetchProductsWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle);
        setProduct(product);
        console.log("context", product);
    }


    const closeCart = () => { }
    const openCart = () => { }
    const closeMenu = () => { }
    return (
        <ShopContext.Provider
            value={{
                product: product, //Single product
                products: products, // Multiple Products
                checkout: checkout,
                lineitems: lineitems,
                checkoutURL: checkoutURL,
                fetchAllProducts: fetchAllProducts,
                fetchProductsWithHandle: fetchProductsWithHandle,
                addItemToCheckout: addItemToCheckout,
                fetchCheckout: fetchCheckout,
                removeLineItem: removeLineItem,
            }}>
            {props.children}
        </ShopContext.Provider>
    )

}

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext }
export default ShopProvider;