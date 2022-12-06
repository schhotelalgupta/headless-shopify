import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


const Collection = () => {
    const { fetchAllProducts, products, addItemToCheckout,checkout } = useContext(ShopContext);
    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div style={{ marginTop: '70px' }}>
            <Container>
                <Row>
                    {
                        products.map(product => (
                            <Col key={product.id} sm={4} style={{ marginTop: '10px' }}>

                                <Card style={{ width: '18rem', textAlign: 'center' }}>
                                    <Card.Img variant="top" style={{ height: '200px', width: 'auto', textAlign: 'center' }} src={(product.images[0]) ? product.images[0].src : ""} />
                                    <Card.Body>
                                        <Card.Title><Link to={`/products/${product.handle}`}>{product.title}</Link></Card.Title>
                                        <Card.Text>
                                            <span><b>{product.variants[0].price.currencyCode} {product.variants[0].price.amount}</b></span>
                                        </Card.Text>
                                        <Button onClick={() => addItemToCheckout(product.variants[0].id, 1)} variant="primary">Add To Cart</Button>
                                    </Card.Body>
                                </Card>

                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
    )

}

export default Collection;