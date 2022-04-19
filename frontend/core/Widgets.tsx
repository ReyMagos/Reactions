import React, {ButtonHTMLAttributes} from "react";

import "./Widgets.css"

const MODULE_PREFIX = "reactions"

/*
 *  Simple elements
 */

interface IButtonProps extends ButtonHTMLAttributes<any> {
    variant?: "success" | "fail" | "regular"
}

export class Button extends React.Component<IButtonProps, {}> {
    static defaultProps = {
        variant: "regular",
    }

    render() {
        const {variant, className, children, ...restProps} = this.props
        const styleClass = `${MODULE_PREFIX}-button ${MODULE_PREFIX}-button-${variant}`

        return (
            <button className={`${styleClass} ${className}`} {...restProps} >{children}</button>
        )
    }
}

interface ITextInputProps extends React.HTMLAttributes<HTMLInputElement> {
    target?: string
}

export class TextInput extends React.Component<ITextInputProps, any> {
    static defaultProps = {

    }

    render() {
        const {className, ...restProps} = this.props
        const styleClass = `${MODULE_PREFIX}-text-input`
        return <input className={`${styleClass} ${className}`} type="text" {...restProps} />
    }
}

interface ICheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
    target: string
    text? : string | null
}

export class CheckBox extends React.Component<ICheckBoxProps, any> {
    static defaultProps = {
        target: "",
        text: null as any
    }

    render() {
        const {target, text, className, ...restProps} = this.props;
        const styleClass = `${MODULE_PREFIX}-checkbox`

        return (
            <div className={`${styleClass} ${className}`}>
                <input id={target} name={target} type="checkbox" {...restProps} />
                <label htmlFor={target}>{text != null ? text : target}</label>
            </div>
        )
    }
}


/*
 *  Complex widgets
 */

type AuthProps = {active: boolean, close: Function}

import Close from "./close.svg"

export const AuthWidget = ({active, close}: AuthProps) => {
    return (
        <div className={active ? "modal modal-active" : "modal"} onMouseDown={() => { close() }}>
            <div className="modal-content reactions-widget w-36 p-3 text-gray-300" onMouseDown={event => event.stopPropagation()}>
                <div className="flex justify-between items-center">
                    <p className="text-lg">Sign in</p>
                    <Button className="sh-1 p-0.5 rounded-b-sm flex items-center space-x-1 text-sm font-thin" onClick={() => { close() }} >
                        {/*<p className="">Close</p>*/}
                        <Close className="fill-gray-300" width="1.3em" height="1.3em" />
                    </Button>
                </div>
                <div className="flex flex-col items-center space-y-1 mt-2">
                    <TextInput className="sh w-full p-0.5 rounded-sm outline-none text-md text-black" target="login" placeholder="E-Mail" />
                    <TextInput className="sh w-full p-0.5 rounded-sm outline-none text-md text-black" target="password" placeholder="Password" />
                </div>
                <div className="flex justify-between items-center mt-0.5">
                    <CheckBox className="text-sm" target="remember" text="Remember me" />
                    <p className="text-xs">Forgot password?</p>
                </div>
                <div className="flex flex-col items-center mt-2 space-y-1">
                    <Button className="sh w-1/2 rounded-sm" type="submit">Enter</Button>
                    <p className="text-sm">Don't have an account?</p>
                </div>
            </div>
        </div>
    );
}
