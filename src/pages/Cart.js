import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
const Cart = () => {

    const { lineitems, checkoutURL, checkout, removeLineItem } = useContext(ShopContext);
    return (
        <div style={{ marginTop: '70px' }}>
            <Container>
                {lineitems.length < 1 ? (
                    <Row>
                        <Col style={{ textAlign: "center" }}>
                            <h1> Empty Cart </h1></Col>
                    </Row>
                ) : (
                    <Row>
                        <Col sm={9}>
                            <Row>
                                <Col></Col>
                                <Col>Title</Col>
                                <Col>Quantity</Col>
                                <Col>Price</Col>
                            </Row>
                            {

                                lineitems.map(lineitem => (
                                    <div key={lineitem.id}>
                                        <Row style={{ marginTop: "20px" }}>
                                            <Col><span><h4 style={{ cursor: "pointer" }} onClick={() => removeLineItem(lineitem.id)}>x</h4></span> <img style={{ width: "90px", height: "90px" }} src={lineitem.variant.image ? lineitem.variant.image.src : ""} /></Col>
                                            <Col>{lineitem.title}</Col>
                                            <Col>{lineitem.quantity} x {lineitem.variant.price.amount}</Col>
                                            <Col>{lineitem.variant.price.amount}</Col>
                                        </Row>
                                    </div>
                                ))

                            }

                        </Col >
                        <Col sm={3}>
                            <Row>
                                <br />
                                <br />
                                <span>Total Amount : <b>{checkout.totalPrice.currencyCode} {checkout.totalPrice.amount}</b>
                                </span>
                                <br />
                                <br />
                                <br />


                                <div style={{ textAlign: "center" }}>
                                    <a href={checkoutURL}> <Button>Checkout</Button></a>
                                </div>

                            </Row>
                        </Col>
                    </Row >

                )
                }



            </Container >
        </div >
    )

}
export default Cart;