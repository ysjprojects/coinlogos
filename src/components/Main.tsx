import axios from "axios";
import React, { Component } from "react";
import { mainState } from "../types";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Api from "./Api";
import { BrowserRouter, Route, Routes } from "react-router-dom"

const baseUrl = "https://coinlogos.sjyu.xyz/"

class Main extends Component<{}, mainState>{
    constructor() {
        super({});
        this.state = {
            logos: [],
            networks: [],
            ids: []
        }

    }


    componentDidMount() {
        let today = new Date();
        let lastupdated = localStorage.getItem("lastupdated")
        let logoscache = localStorage.getItem("logoscache")
        if (lastupdated === null || today.getTime() - parseInt(lastupdated) > (24 * 60 * 60 * 1000) || logoscache === null) {
            axios.get(baseUrl + "api/logos")
                .then((res) => {
                    let data = res.data;
                    this.setState(
                        {
                            logos: data.result,
                            ids: data.metadata.ids,
                            networks: data.metadata.networks
                        }
                    )
                    localStorage.setItem("logoscache", JSON.stringify(data));
                    localStorage.setItem("lastupdated", today.getTime() + "")
                })
        } else {
            //read from localstorage
            let logoscacheobj = JSON.parse(logoscache);
            this.setState(
                {
                    logos: logoscacheobj.result,
                    ids: logoscacheobj.metadata.ids,
                    networks: logoscacheobj.metadata.networks

                }
            )

        }

    }

    render() {
        return (
            <div>
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home logos={this.state.logos} networks={this.state.networks} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/api" element={<Api />} />
                    </Routes>
                </BrowserRouter>

                <Footer />

            </div >

        )
    }


}

export default Main;