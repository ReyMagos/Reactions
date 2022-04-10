import React from "react"
import ReactDOM from "react-dom"

import Core from "./core/Core"
import "./core/Core.css"

namespace Reactions {
    export const Header = () => {
        return (
            <header className="bg-black">
                <div className="flex justify-center">
                    <h1 className="text-white text-xl">Reactions</h1>
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
