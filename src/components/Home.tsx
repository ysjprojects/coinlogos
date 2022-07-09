import React from "react";
import Landing from "./home/Landing";
import Gallery from "./home/Gallery";
import { resdocType } from "../types"

type homeProps = {
    logos: resdocType[],
    networks: string[]
}
const Home = (props: homeProps) => {
    return (
        <div>
            <Landing />
            <Gallery logos={props.logos} networks={props.networks} />
        </div>
    )
}

export default Home;