import React from "react";
import axios from "axios";
import Close from "./close.svg"
import {useForm} from "react-hook-form";

import "./Widgets.css"


const MODULE_PREFIX = "reactions"

class ClassName {
  static className = []

  static apply(names: string) {
    if (names != null) {
      this.className.push(...names.split(" "))
    }
    return this
  }

  static applyWhen(names: string, predicate: boolean) {
    if (predicate) this.apply(names)
    return this
  }

  static asString() {
    const result = this.className.join(" ")
    this.className = []

    return result
  }
}

function style(name: string, ...variants: string[]) {
  const className = [`${MODULE_PREFIX}-${name}`]
  variants.map(variant => className.push(`${MODULE_PREFIX}-${name}-${variant}`))
  return className.join(" ")
}

export const ModalWidget = (props: React.PropsWithChildren<{ active: boolean, close: Function }>) => {
  const [pulsing, setPulsing] = React.useState(false)

  return (
    <div className={
      ClassName
        .apply(style("modal"))
        .applyWhen(style("modal", "active"), props.active)
        .applyWhen(style("pulse-animation"), pulsing)
        .asString()
    } onMouseDown={() => setPulsing(true)} onAnimationEnd={() => setPulsing(false)}>
      <div className={
        ClassName
          .apply(style("modal-content"))
          .apply(style("widget"))
          .apply("w-36 px-3 pb-3 text-gray-300 overflow-hidden")
          .asString()
      } onMouseDown={event => event.stopPropagation()}>
        <div className="flex justify-end w-full">
          <button className="close text-md" onClick={() => props.close()}>
            <Close className="fill-gray-300" width="1.3em" height="1.3em"/>
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

interface PTextInput extends React.HTMLAttributes<HTMLInputElement> {
  variant?: string
  target?: string
  dropdown?: React.RefObject<Dropdown>
}

export const TextInput = (props: PTextInput) => {
  const [dockToDropdown, setDock] = React.useState(false)

  const {variant = "default", target, dropdown, className, ...restProps} = props
  const dropdownControl: PTextInput = dropdown ? {
    onFocus: () => {
      dropdown.current.open()
      setDock(true)
    },
    onBlur: () => {
      dropdown.current.close()
      setDock(false)
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      // axios.get("/films", {params: {text: event.target.value}})
      //   .then(response => dropdown.current.update(response.data.films))
      //   .catch(error => console.log(error))
      dropdown.current.update(["1", "2", "3"].map(n => <p>{event.target.value} {n}</p>))
    }
  } : null
  return <input
    className={
      ClassName
        .apply(style("text-input", variant))
        .apply(className)
        .applyWhen("dock", dockToDropdown)
        .asString()
    } type="text" {...dropdownControl} {...restProps} />
}

interface PCheckbox extends React.HTMLAttributes<HTMLInputElement> {
  variant?: string,
  target?: string,
  text?: string
}

export const Checkbox = (props: PCheckbox) => {
  const {variant = "default", target, text, className, ...restProps} = props
  return (
    <div className={ClassName.apply(style("checkbox", variant)).apply(className).asString()}>
      <input name={target} type="checkbox" {...restProps} />
      {text != null && <label htmlFor={target}>{text}</label>}
    </div>
  )
}

interface PDropdown {
  onSelect?: Function
  className?: string
}

export class Dropdown extends React.Component<PDropdown, any> {
  constructor(props: PDropdown) {
    super(props)
    this.state = {active: false, items: []}
  }

  open() {
    this.setState({active: true})
  }

  close() {
    this.setState({active: false})
  }


  update(items: Array<JSX.Element>) {
    this.setState({items: items})
  }

  render() {
    return (
      <div className="relative">
        <div className={
          ClassName
            .apply(style("dropdown"))
            .applyWhen(style("dropdown", "active"), this.state.active)
            .asString()
        }>
          {this.state.items.map(item => (
            <div>
              <button className="w-full border-none text-left pl-1 hover:bg-gray-200 rounded-none">{item}</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


const FormInput = (props: any) => {
  console.log(props)
  const {className, ...restProps} = props
  return <input className={ClassName.apply("w-full p-0.5").apply(className).asString()} {...restProps} />
}

type FormData = {
  login: string
  password: string
}

export const Auth = (props: { className?: string, app: any }) => {
  const { register, handleSubmit } = useForm<FormData>()
  const sendForm = handleSubmit((data: FormData) => {
    console.log(data)
    axios.post("/login", { login: data.login, password: data.password })
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
  })

  return (
    <div className={props.className}>
      <form onSubmit={sendForm}>
        <div>
          <p className="text-lg">Sign in</p>
        </div>
        <div className="flex flex-col items-center space-y-1 mt-2 text-md text-black">
          <input {...register("login")} className="w-full p-0.5" placeholder="E-Mail"/>
          <input {...register("password")} className="w-full p-0.5" placeholder="Password"/>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <Checkbox className="text-xs space-x-0.5" target="remember" text="Remember me"/>
          <a className="text-xs">Forgot password?</a>
        </div>
        <div className="flex flex-col items-center space-y-1 mt-2">
          <button className="sh text-lg w-1/2 rounded-sm" type="submit">Enter</button>
          <a className="text-xs" onClick={() => {
            props.app.setActiveModal(<Register app={props.app}/>)
          }}>Don't have an account?</a>
        </div>
      </form>
    </div>
  )
}


export const Register = (props: { className?: string, app: any }) => {
  return (
    <div className={props.className}>
      <div className="flex">
        <p className="text-lg">Register</p>
      </div>
      <div className="flex flex-col items-center space-y-1 mt-2 text-md text-black">
        <FormInput target="username" placeholder="Username"/>
        <FormInput target="login" placeholder="E-Mail"/>
        <FormInput target="password" placeholder="Password"/>
        <FormInput target="" placeholder="Password Again"/>
      </div>
      <div className="flex flex-col items-center mt-2 space-y-1">
        <button className="sh text-lg w-1/2 rounded-sm" type="submit">Enter</button>
        <a className="text-xs" onClick={() => {
          props.app.setActiveModal(<Auth app={props.app}/>)
        }}>Already have an account?</a>
      </div>
    </div>
  )
}


export const FilmPreview = () => {
  return <div className={ClassName.apply(style("film-preview")).apply(style("widget")).asString()}></div>
}
