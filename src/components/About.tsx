import React from "react";
import { Container, Row, Col } from "reactstrap";
const About = () => {
    return (
        <Container className="text-start">
            <Row className="pt-5 pb-5" >
                <h1>About Us</h1>
                <p>While Coingecko API offers a robust trove of cryptocurrency data, one thing that it lacks is the ability to query cryptocurrency logos. Crypto logos are in demand due to their capability of enhancing the UX/UI component of many cryptocurrency project.
                </p>
                <p>However, current REST API solutions are often limited in scope and query functions. On the other hand, the process of manually gathering the logos and mapping the contract addresses to the logos is too time-consuming.
                </p>
                <p>
                    <b>Coinlogos</b> offers a unique solution by allowing clients to query cryptocurrency logos based on contract address, ticker and coin identifier.</p>
                <p>Currently, the database contains the top 1000 coins/tokens by Coingecko marketcap. More logos will be added in the future.</p>
            </Row>
            <Row className="pb-5">
                <h1>Services</h1>
                <Row>
                    <h3>Gallery</h3>
                    <p>Users can search for and view cryptocurrency logos. They can download these logos directly through a link.</p>
                </Row>
                <Row>
                    <h3>Rest API</h3>
                    <p>Our REST API allows you to query crypto logos in a programmatic fashion, based on contract address, ticker and coin identifier. <br /> It is free for all to use, but a rate limit of <b>100 requests per hour</b> is imposed.</p>

                </Row>

            </Row>
            <Row className="pb-5 text-center">
                <h1>Contact Us</h1>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSckLcVWkO0kn4znpTmAyVaz7FQ-j87DjOPBzP3AtvFiwFzfWA/viewform?embedded=true" width="640" height="709" frameBorder="0" marginHeight={0} marginWidth={0}>Loading…</iframe>

            </Row>
        </Container >
    )
}

export default About;