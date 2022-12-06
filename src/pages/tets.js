
class ShopProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            products: [],
            checkout: {},
            isCartOpen: false,
            isMenuOpen: false,
        }
    }

    componentDidMount() {
        this.createCheckout()
    }

    createCheckout = async () => {
        console.log("shubham");
        const checkout = await client.checkout.create();
        localStorage.setItem("checkout_id", checkout);
        this.setState({ checkout: checkout });

    }

    fetchCheckout = async () => { }
    addItemToCheckout = async () => { }
    removeLineItem = async (id) => { }
    fetchAllProducts = async () => {
        const allproduct = await client.product.fetchAll();
        this.setState({ products: allproduct });
    }

    fetchProductsWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle);
        this.setState({ product: product });
    }

    closeCart = () => { }
    openCart = () => { }
    closeMenu = () => { }
    render() {
        return (
            <ShopContext.Provider>
                {this.props.children}
            </ShopContext.Provider >

        );
    }
}

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext }
export default ShopProvider;