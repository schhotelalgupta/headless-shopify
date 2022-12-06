import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useParams, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Product = () => {
    const { handle } = useParams();
    const { fetchProductsWithHandle, addItemToCheckout, product, checkout } = useContext(ShopContext);
    useEffect(() => {
        fetchProductsWithHandle(handle);
    }, []);

    if (!product) return <div>Loading...</div>
    return (
        <div style={{ marginTop: '70px' }}>
            <Container>
                <Row>
                    <Col><img style={{ height: '300px', width: '400px', textAlign: 'center' }} src={(product.images[0]) ? product.images[0].src : ""} /></Col>
                    <Col>
                        <Row><h3>{product.title}</h3></Row>
                        <Row style={{ marginTop: '5px' }}><span><b>{product.variants[0].price.currencyCode} {product.variants[0].price.amount}</b></span></Row>
                        <Row style={{ marginTop: '5px' }}><span>{product.description}</span></Row>
                        <Row style={{ marginTop: '20px' }}><span><Button onClick={() => addItemToCheckout(product.variants[0].id, 1)} variant="primary">Add To Cart</Button></span></Row>
                    </Col>
                </Row>

            </Container>

        </div>
    )

}
export default Product