import React from "react"
import ReactDOM from "react-dom"

import Core from "./core/Core"

import "./index.css"

namespace Reactions {
    export const Header = () => {
        return (
            <header className="flex items-center justify-center space-x-16 bg-black text-white">
                <div className="header-row1">
                    <h1 className="text-3xl text-primary">Reactions</h1>
                </div>
                <div className="header-row2 flex flex-col space-y-4 w-1/4">
                    <p className="text-sm text-center leading-tight">
                        This is not a real project. Only your imagination can bring it to the real world
                    </p>
                    <div className="space-y-1">
                        <p className="text-md text-center">
                            Enlarge your sense
                        </p>
                        <div className="flex justify-center space-x-1">
                            <Core.Button className="text-sm w-full" text="Sign in" />
                            <Core.Button className="text-sm w-full" text="Register" />
                        </div>
                    </div>
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
