import React from "react";

namespace Core {
    interface ButtonProps {
        variant: "success" | "fail" | "regular"
        text: string
    }

    export class Button extends React.Component<ButtonProps, any> {
        static defaultProps = {
            variant: "regular",
            text: ""
        };

        constructor(props: any) {
            super(props)
        }

        render() {
            return <button className={`btn btn-${this.props.variant}`}>{this.props.text}</button>
        }
    }
}

export default Core;
