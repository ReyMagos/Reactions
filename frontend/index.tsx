import React from "react"
import ReactDOM from "react-dom/client"

import * as Core from "./Core/Widgets"

import "./index.css"
import {AuthWidget} from "./Core/Widgets";

const Header = (props: { app: any }) => {
    return (
        <header className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between w-2/3 h-11">
                <h1 className="text-2xl">
                    Reactions
                </h1>
                <div className="flex items-center space-x-2">
                    <Core.Button className="p-0.5"
                                 onClick={() => { props.app.setModalActive("auth", true) }}>Sign in</Core.Button>
                    <Core.Button className="p-0.5">Register</Core.Button>
                </div>
            </div>
            <div className="w-2/3">
                <Core.TextInput className="w-full p-1" placeholder="Search for films" />
            </div>
            <div className="w-1/2 mt-2">
                <p className="text-lg text-center leading-tight">
                    This is not a real project. Only your imagination can bring it to the real world
                </p>
            </div>
        </header>
    )
}

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.setModalActive.bind(this)
        this.state = {
            modals: {
                "auth": false
            }
        }
    }

    setModalActive(modal: string, state: boolean) {
        this.setState({
            modals: { "auth": state }
        })
    }

    render() {
        return (
            <div>
                <Header app={this} />
                <AuthWidget active={this.state.modals["auth"]}
                            close={() => { this.setModalActive("auth", false) }} />
            </div>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementsByTagName("body")[0]);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
