import React from "react";
import landingBg from "../../assets/img/landingbg.jpg"
import logo from "../../assets/img/coinlogos.png"

const Landing = () => {
    return (
        <div className="text-white overlay" style={{ backgroundImage: `url(${landingBg})`, minHeight: '50vh' }}>
            <div style={{ position: 'relative', zIndex: 99 }}>
                <div className="pt-5">

                </div>
                <div>
                    <img id="landinglogo" className="border border-2 border-warning rounded-circle" src={logo} />
                </div>
                <br />
                <h1>Coinlogos</h1>
                <h5 className="fw-light"><em>Your one-stop solution for cryptocurrency logos and other assets</em></h5>
                <div className="pb-5">

                </div>

            </div>

        </div>
    )

}

export default Landing;