import React, {ReactNode} from "react";
import axios from "axios";
import Close from "./close.svg"
import {useForm, FormProvider, useFormContext} from "react-hook-form";

import "./Widgets.css"


const MODULE_PREFIX = "reactions"

export class ClassName {
  private static className = new Set<string>()

  static apply(names: string) {
    if (names != null) {
      names.split(" ").map(name => this.className.add(name))
    }
    return this
  }

  static applyWhen(names: string, predicate: boolean) {
    if (predicate) this.apply(names)
    return this
  }

  static asString() {
    const result = Array.from(this.className).join(" ")
    this.className.clear()

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
}

export const TextInput = (props: PTextInput) => {
  const {variant="default", target, className, ...restProps} = props
  const formProps = target != null ? useFormContext().register(target) : null

  return <input
    className={
      ClassName
        .apply(style("text-input", variant))
        .apply(className)
        .asString()
    } type="text" {...formProps} {...restProps} />
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
  active?: boolean
  items?: Array<{id: any, value: JSX.Element}>
  onSelect?: Function
  className?: string
}

export const Dropdown = (props: PDropdown) => {
  console.log(props.items)
  return (
    <div className="relative">
      <div className={
        ClassName
          .apply(style("dropdown"))
          .applyWhen(style("dropdown", "active"), props.active)
          .apply(props.className)
          .asString()
      }>
        {props.items.map(item => (
          <div>
            <button className="w-full border-none text-left pl-1 hover:bg-gray-200 rounded-none"
                    onClick={() => props.onSelect(item.id)}>{item.value}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const DropdownProvider = (props: { children: Function }) => {
  const [active, setActive] = React.useState(false)
  const [items, updateItems] = React.useState([])

  return props.children(active, setActive, items, updateItems)
}

const FormInput = (props: any) => {
  const {className, ...restProps} = props
  return <TextInput className={ClassName.apply("w-full p-0.5").apply(className).asString()}
                    variant="float" {...restProps} />
}

export const Auth = (props: { className?: string, app: any }) => {
  type AuthFormData = {
    login: string
    password: string
  }
  const formMethods = useForm<AuthFormData>()
  const sendForm = formMethods.handleSubmit((data: AuthFormData) => {
    axios.post("/login", {...data})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
  })

  return (
    <div className={props.className}>
      <FormProvider {...formMethods}>
        <form onSubmit={sendForm}>
          <div>
            <p className="text-lg">Sign in</p>
          </div>
          <div className="flex flex-col items-center space-y-1 mt-2 text-md text-black">
            <FormInput target="login" placeholder="Username"/>
            <FormInput target="password" placeholder="Password"/>
          </div>
          <div className="flex justify-between items-center mt-0.5">
            <Checkbox className="text-xs space-x-0.5" text="Remember me"/>
            <a className="text-xs">Forgot password?</a>
          </div>
          <div className="flex flex-col items-center space-y-1 mt-2">
            <button className="sh text-lg w-1/2 rounded-sm" type="submit">Enter</button>
            <a className="text-xs" onClick={() => {
              props.app.setActiveModal(<Register app={props.app}/>)
            }}>Don't have an account?</a>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export const Register = (props: { className?: string, app: any }) => {
  type RegisterFormData = {
    username: string
    login: string
    password: string
    repeat_password: string
  }
  const formMethods = useForm<RegisterFormData>()
  const sendForm = formMethods.handleSubmit((data: RegisterFormData) => {
    axios.post("/register", {...data})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
  })

  return (
    <div className={props.className}>
      <FormProvider {...formMethods}>
        <form onSubmit={sendForm}>
          <div className="flex">
            <p className="text-lg">Register</p>
          </div>
          <div className="flex flex-col items-center space-y-1 mt-2 text-md text-black">
            <FormInput target="username" placeholder="Username"/>
            <FormInput target="login" placeholder="E-Mail"/>
            <FormInput target="password" placeholder="Password"/>
            <FormInput target="repeat_password" placeholder="Password Again"/>
          </div>
          <div className="flex flex-col items-center mt-2 space-y-1">
            <button className="sh text-lg w-1/2 rounded-sm" type="submit">Enter</button>
            <a className="text-xs" onClick={() => {
              props.app.setActiveModal(<Auth app={props.app}/>)
            }}>Already have an account?</a>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}


export const ReviewText = (props: { text: string, author: string }) => {
  return (
    <div className="bg-[#666a7055] rounded-sm p-0.5 font-thin">
      <p>{props.text} <span className="font-medium bg-[#787878] rounded-sm p-[3px]">{props.author}</span></p>
    </div>
  )
}


export const FilmPreview = (props: { children?: ReactNode | undefined }) => {
  const [isExpanded, expand] = React.useState(false)

  return (
    <div className={
      ClassName
        .apply(style("film-preview"))
        .apply(style("widget"))
        .apply("flex flex-col justify-center text-gray-300 p-1 w-2/3")
        .asString()
    }>
      <div className={
        ClassName
          .apply("flex items-center justify-around")
          .asString()
      }>
        <p className="transition-all">Film Name</p>
        <button className="sh text-lg w-1/4 rounded-sm" onClick={() => expand(!isExpanded)}>Read more</button>
      </div>
      <div className={ClassName.apply("desc text-sm mt-2 flex flex-col gap-y-1").applyWhen("collapsed", !isExpanded).asString()}>
        {props.children}
        <div className="flex flex-col items-center rounded-sm">
          <textarea className="sh2 text-black p-0.5 w-full h-[100px] rounded-sm resize-none outline-none mt-2"></textarea>
          <div className="flex justify-center w-full my-1">
            <button className="sh w-1/4 rounded-sm ml-1">Send review</button>
          </div>
        </div>
      </div>
    </div>
  )
}
