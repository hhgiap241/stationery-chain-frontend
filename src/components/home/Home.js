import React, {useState} from 'react';
import ProductList from "../product/ProductList";
import {Carousel} from "react-bootstrap";

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100" style={{height: '400px', width: '800px'}}
                        src={"https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fcdf1e1fa-218e-11e9-bf10-a69b3e42a388.jpg?crop=2667%2C1500%2C0%2C0&resize=1500"}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100" style={{height: '400px', width: '800px'}}
                        src="https://img.freepik.com/premium-psd/corporate-stationery-mockup-with-dark-theme_204971-394.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100" style={{height: '400px', width: '800px'}}
                        src="https://cdn.shopify.com/s/files/1/0834/0231/files/Notebooks_3979c87b-2c66-4220-93fe-c5e731ce33a9_800x700.png?v=1664186135"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className={'more-space'}/>
            <ProductList/>
        </>
    );
};

export default Home;