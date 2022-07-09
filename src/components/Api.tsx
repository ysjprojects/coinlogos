import React from "react";
import { Container, Row, Card, CardBody, Button, CardText } from "reactstrap";



const Api = () => {

    return (
        <Container >
            <Row className="mt-5 mb-2">
                <h1><b>API Endpoints</b></h1>

            </Row>
            <Row className="text-start">
                <h5>Base URL: https://coinlogos.kekapi.com</h5>

            </Row>
            <Row className="text-start">
                <h5>Rate Limit: 100 requests per hour</h5>

            </Row>
            <Row className="mb-5 text-start">

                <div>
                    <p className="api-endpoint-description">Get all logos</p>
                </div>
                <hr />
                <Card className="ps-0">
                    <CardBody>
                        <Button style={{ width: "75px" }} color="success"><b>GET</b></Button>

                        <span className="api-url"><b>/api/logos</b> </span>
                    </CardBody>
                </Card>

            </Row>

            <Row className="mb-5 text-start">

                <div>
                    <p className="api-endpoint-description">Get logo by coin identifier</p>
                </div>
                <hr />
                <Card className="ps-0">
                    <CardBody>
                        <Button style={{ width: "75px" }} color="success"><b>GET</b></Button>

                        <span className="api-url"><b>/api/logos/id/:id</b> </span>
                    </CardBody>
                </Card>

            </Row>

            <Row className="mb-5 text-start">

                <div>
                    <p className="api-endpoint-description">Get logo by ticker (in upper case)</p>
                </div>
                <hr />
                <Card className="ps-0">
                    <CardBody>
                        <Button style={{ width: "75px" }} color="success"><b>GET</b></Button>

                        <span className="api-url"><b>/api/logos/ticker/:ticker?firstres=val</b> </span>
                    </CardBody>
                </Card>
                <CardText>firstres val: 0 (get all tokens with the same ticker) or 1 (get first result)</CardText>


            </Row>

            <Row className="mb-5 text-start">

                <div>
                    <p className="api-endpoint-description">Get logo by contract address and network</p>
                </div>
                <hr />
                <Card className="ps-0">
                    <CardBody>
                        <Button style={{ width: "75px" }} color="success"><b>GET</b></Button>

                        <span className="api-url"><b>/api/logos/address/:network/:address</b> </span>
                    </CardBody>
                </Card>

            </Row>
            <Row className="mb-5 text-start">

                <div>
                    <p className="api-endpoint-description">Get logos metadata (ids and networks)</p>
                </div>
                <hr />
                <Card className="ps-0">
                    <CardBody>
                        <Button style={{ width: "75px" }} color="success"><b>GET</b></Button>

                        <span className="api-url"><b>/api/logos/metadata</b> </span>
                    </CardBody>
                </Card>

            </Row>
        </Container>
    )

}

export default Api;