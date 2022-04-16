import React from "react";

import "./Core.css"

namespace Core {
    interface ButtonProps {
        variant?: "success" | "fail" | "regular"
        className?: string
        text?: string
    }

    export class Button extends React.Component<ButtonProps, any> {
        static defaultProps = {
            variant: "regular",
            className: "",
            text: ""
        };

        constructor(props: any) {
            super(props)
        }

        render() {
            return <button className={`btn btn-${this.props.variant} ${this.props.className}`}>{this.props.text}</button>
        }
    }
}

export default Core;
