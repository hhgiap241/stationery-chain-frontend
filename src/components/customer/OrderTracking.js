import React from 'react';
import OrderStatus from "../helper/OrderStatus";

const OrderTracking = (props) => {
    const status = props.status;
    const format = new Date(props.date);
    console.log(format);
    const month = format.getMonth() + 1;
    const orderDate = format.getDate() + "/" + month + "/" + format.getFullYear();
    const deliveryDate = format.getDate() + 1 + "/" + month + "/" + format.getFullYear();
    const deliveredDate = format.getDate() + 2 + "/" + month + "/" + format.getFullYear();
    console.log(orderDate);
    return (
        <div className="row">
            <div className="col-12 hh-grayBox pt45 pb20">
                <div className="row justify-content-between">
                    {
                        status === OrderStatus.DELIVERING ? (
                            <>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.PENDING}<br/><span>{orderDate}</span></p>
                                </div>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.DELIVERING}<br/><span>{deliveryDate}</span></p>
                                </div>
                                <div className="order-tracking">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.DELIVERED}<br/><span>#########</span></p>
                                </div>
                            </>
                        ) : status === OrderStatus.DELIVERED ? (
                            <>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.PENDING}<br/><span>{orderDate}</span></p>
                                </div>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.DELIVERING}<br/><span>{deliveryDate}</span></p>
                                </div>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.DELIVERED}<br/><span>{deliveredDate}</span></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.PENDING}<br/><span>{orderDate}</span></p>
                                </div>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.DELIVERING}<br/><span>{deliveryDate}</span></p>
                                </div>
                                <div className="order-tracking">
                                    <span className="is-complete"></span>
                                    <p>{OrderStatus.CANCELLED}<br/><span>#########</span></p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;