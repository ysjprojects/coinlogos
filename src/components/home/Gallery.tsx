import React, { useState } from "react";
import { Container, Row, Col, FormGroup, InputGroup, Input, Button } from "reactstrap";
import { resdocType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

type galleryProps = {
    logos: resdocType[],
    networks: string[]
}

const displayEntry = (logo: resdocType, selectedNetwork: string, searchStr: string) => {
    if (selectedNetwork === "" && searchStr === "") {
        return true
    } else if (selectedNetwork !== "" && searchStr === "") {
        return logo.data.addresses.filter((address) => { return address.network === selectedNetwork }).length !== 0
    } else if (selectedNetwork === "" && searchStr !== "") {
        return logo.data.id.includes(searchStr)
    } else {
        return logo.data.id.includes(searchStr)
            &&
            logo.data.addresses.filter((address) => { return address.network === selectedNetwork }).length !== 0
    }
}



const Gallery = (props: galleryProps) => {
    const [selectedNetwork, setSelectedNetwork] = useState("")
    const [searchStr, setSearchStr] = useState("")

    const handleSelectNetwork = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedNetwork(e.target.value)
    }

    const handleSearchStr = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value.toLowerCase())
    }


    return (
        <Container >
            <Row className="mt-5">

                <Col md={9} lg={10}>
                    <FormGroup >
                        <InputGroup>
                            <Button color="primary"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                            <Input
                                type="text"
                                name="logo"
                                id="logo"
                                value={searchStr}
                                onChange={handleSearchStr}
                            >

                            </Input>
                        </InputGroup>

                    </FormGroup>

                </Col>
                <Col md={3} lg={2}>
                    <FormGroup >
                        <Input
                            type="select"
                            name="network"
                            id="network"
                            value={selectedNetwork}
                            onChange={handleSelectNetwork}
                        >
                            <option value="" selected disabled hidden>Choose network</option>


                            {props.networks.map(network => {
                                return (
                                    <option>{network}</option>
                                )
                            })}

                        </Input>
                    </FormGroup>
                </Col>

            </Row>
            <Row className="mt-5 mb-5">
                {
                    props.logos.filter((logo) => { return displayEntry(logo, selectedNetwork, searchStr) }).map((logo) => {
                        return (
                            <Col className="mb-5" sm={6} md={3} lg={2}>
                                <img src={`/assets/logos/${logo.data.id}.png`} />
                                <a className="d-block" target="_blank" href={`/assets/logos/${logo.data.id}.png`}>{`${logo.data.id}.png`}</a>
                            </Col>
                        )
                    })}

            </Row>
        </Container>
    )

}

export default Gallery;