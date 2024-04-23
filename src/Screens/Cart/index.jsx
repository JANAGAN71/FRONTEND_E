import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import Box from "./Box";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
// import {loadStripe} from '@stripe/stripe-js';
import GooglePayButton from "@google-pay/button-react";
// import { useHistory } from 'react-router-dom';


const Cart = () =>{
    // const history = useHistory();
    const navigate = useNavigate();
    const Cart = useSelector(state=>state.Cart.items);
    const total_count = useSelector(state=>state.Cart.totalCount);
    const total_amount = useSelector(state=>state.Cart.totalAmount);
    console.log("CARTTT", Cart, Cart[0].price + Cart[1].price);
    let tot_Price = 0;
    Cart.forEach(element => {
        console.log("p", element.price, element.count);
        tot_Price += (element.price*element.count);
    });
    console.log("TOT", tot_Price);

    // makePayment = async()=>{
    //     const stripe = await loadStripe()
    // }
    const handleSubmit = (e) =>{
        e.preventDefault();
        Swal.fire(
            'Order placed!',
            'BUY THINK GROW!',
            'success'
        )
        setTimeout(()=>{
            navigate('/Ecommerce');
        },2000)
    }
    return(
        <div className="Cart">
            <div className="Shopping">
                <div className="shopWid">
                    <div className="Shopping_cart">
                        <div className="ShopHead">
                            <h1>Shopping Cart</h1>
                            <h3>Items: {total_count}</h3>
                        </div>
                        <div className="line"></div>
                        <div className="ShopHead">
                            <p>Product Details</p>
                            <p>Total payment</p>
                        </div>
                        <div className="Box_contain">
                            {
                                (Cart).map((elem)=>
                                    <Box elem={elem} key={elem.id}/>
                                )
                            }
                        </div>
                    </div>
                    <div className="back" onClick={()=>{navigate('/Ecommerce')}}>
                        <HiOutlineArrowNarrowLeft/>
                        &nbsp;&nbsp;
                        <p>Continue shopping</p>
                    </div>
                </div>
            </div>
            <div className="Payment">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="Order">
                        <h1>ORDER SUMMARY</h1>
                        <div className="Order_head">
                            <div className="row">
                                <h2>Item {total_count}</h2>
                                <h2>${total_amount}</h2>
                            </div>
                        <div className="line"></div>
                        </div>
                        <div className="field">
                            <label htmlFor="">Email</label>
                            <input required type="text" placeholder="Email Id" />
                        </div>
                        <div className="field">
                            <label htmlFor="">Shipping</label>
                            <input required type="text" placeholder="Shipping Address" />
                        </div>
                        <div className="field">
                            <label htmlFor="">Card Information</label>
                            <input required type="text" placeholder="1234 1234 1234 1234" />
                            <div className="mini">
                            <input type="date" className="miniInp" />
                            <input type="text" className="miniInp" placeholder="Card Verification Code" />
                            </div>

                        </div>
                        <div className="field">
                            <label htmlFor="">Card Holder Name:</label>
                            <input required type="text" placeholder="Enter CardHolder Name"/>
                        </div>
                        <div className="line"></div>
                        <div className="Order_bottom">
                            <h1>Total Cost: ${total_amount}</h1>
                            <GooglePayButton
                            environment="TEST"
                            buttonSizeMode="static"
                            buttonColor="white"
                            // buttonType="buy"
                            className="gpayBtn"
                            paymentRequest={{
                              apiVersion: 2,
                              apiVersionMinor: 0,
                              allowedPaymentMethods: [
                                {
                                  type: 'CARD',
                                  parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                  },
                                  tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                      gateway: 'example',
                                      gatewayMerchantId: 'exampleGatewayMerchantId',
                                    },
                                  },
                                },
                              ],
                              merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo only',
                              },
                              transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: tot_Price.toString(),
                                currencyCode: 'USD',
                                countryCode: 'US',
                              },
                            //   shippingAddressRequired:true,
                            //   callbackIntents:"PAYMENT_AUTHORIZATION",
                            }}
                            onLoadPaymentData={paymentRequest => {
                              console.log('Success', paymentRequest.paymentMethodData);
                            //   history.pushState("/confirm");
                            }}
                            onPaymentAuthorized={paymentRequest => {
                                console.log("Payment Authorization method", paymentRequest);
                                return {transactionState:"SUCCESS"}
                            }}
/>
                            <button type="submit" >Proceed to Pay</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cart;
