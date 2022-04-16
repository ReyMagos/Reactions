import React from "react"
import ReactDOM from "react-dom"

import Core from "./core/Core"

import "./index.css"

namespace Reactions {
    export const Header = () => {
        return (
            <header className="flex flex-col justify-center bg-black text-white">
                <div className="header-row1 flex justify-around">
                    <h1 className="text-3xl">Reactions</h1>
                    <p className="text-s">This is not a real project. Only your imagination can bring it to real world</p>
                </div>
                <div className="header-row2 flex justify-center">
                    <Core.Button text="Sign in" />
                    <Core.Button text="Register" />
                </div>
            </header>
        )
    }
}

const mainView = () => {
    return (
        <div>
            <Reactions.Header />
            <div id="content">

            </div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>{mainView()}</React.StrictMode>,
    document.getElementsByTagName("body")[0]
)
