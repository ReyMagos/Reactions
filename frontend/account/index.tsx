import React from "react"
import ReactDom from "react-dom"


const accountView = () => {
    return (
        <div>
            <header>
                <h1 className="text-2xl">Account</h1>
            </header>
            <div id="content">

            </div>
        </div>
    );
};

ReactDom.render(accountView(), document.getElementById("root"));
