import React from "react"
import ReactDOM from "react-dom"


const mainView = () => {
    return (
        <div>
            <header>
                <h1 className="text-2xl">Reactions</h1>
            </header>
            <div id="content">

            </div>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>{mainView()}</React.StrictMode>,
    document.getElementsByTagName("body")[0]
);
