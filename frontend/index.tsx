import React, {ChangeEvent, ReactNode} from "react"
import ReactDOM from "react-dom/client"
import axios from "axios"

import * as Core from "./Core/Widgets"
import {ClassName} from "./Core/Widgets"

import "./index.css"
import Cookies from "universal-cookie";

function loadFilms(inputText: string, updateDropdown: Function) {
  type Film = {
    id: number
    name: string
  }
  axios.post("/films", {text: inputText})
    .then(response => {
      updateDropdown(response.data.films.map((film: Film) => {
        return {id: film.id, value: <p>{film.name}</p>}
      }))
    })
    .catch(error => console.log(error))
}

function showReviews(id: number, updateFilms: Function) {
  updateFilms(<Core.FilmPreview id={id} />)
}

const SignedUserMenu = (props: { username: string, onSignOut: Function }) => {
  return (
    <div className="flex items-center space-x-2">
      <p>{props.username}</p>
      <button className="p-0.5" onClick={() => {
        const cookie = new Cookies()
        cookie.remove("username")
        cookie.set("is_authorized", false)
        props.onSignOut()
      }}>Sign Out</button>
    </div>
  )
}

const UnsignedUserMenu = (props: { app: any, onRegister: Function }) => {
  return (
    <div className="flex items-center space-x-2">
      <button className="p-0.5" onClick={() => {
        props.app.setActiveModal(<Core.Auth app={props.app} onSuccess={props.onRegister} />)
      }}>Sign in
      </button>
      <button className="p-0.5" onClick={() => {
        props.app.setActiveModal(<Core.Register app={props.app} onSuccess={props.onRegister} />)
      }}>Register
      </button>
    </div>
  )
}

const Header = (props: { app: any }) => {
  const [signedUser, setSignedUser] = React.useState(null)

  return (
    <header className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-2/3 h-11">
        <h1 className="text-2xl">Reactions</h1>
        {
          signedUser != null ? <SignedUserMenu username={signedUser} onSignOut={() => setSignedUser(null)} /> :
          <UnsignedUserMenu app={props.app} onRegister={() => {
            const cookies = new Cookies()
            setSignedUser(cookies.get("username"))
          }} />
        }
      </div>
      <div className="w-2/3">
        <Core.DropdownProvider>
          {(active: boolean, setActive: Function, items: Array<{id: any, value: ReactNode}>, updateItems: Function) => {
            const flag = active && items.length > 0
            return (
              <React.Fragment>
                <Core.TextInput variant="solid"
                           className={ClassName.apply("w-full p-1").applyWhen("dock sh1", flag).asString()}
                           placeholder="Search for films" onFocus={() => setActive(true)} onBlur={() => setActive(false)}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => loadFilms(event.target.value, updateItems)}/>
                <Core.Dropdown className="sh1 transition-all max-h-[30vh] overflow-y-auto" active={flag} items={items}
                               onSelect={(id: any) => showReviews(id, (films: ReactNode) => {props.app.updateFilms(films)})}/>
              </React.Fragment>
            )
          }}
        </Core.DropdownProvider>
      </div>
      <div className="w-1/2 mt-2">
        <p className="text-lg text-center leading-tight">
          This is not a real project. Only your imagination can bring it to the real world
        </p>
      </div>
    </header>
  )
}

const Footer = () => {
  return <footer></footer>
}

class App extends React.Component<any, {films: ReactNode, modal: ReactNode}> {
  constructor(props: any) {
    super(props);

    this.setActiveModal.bind(this)
    this.state = {films: [], modal: null}
  }

  setActiveModal(content: ReactNode) {
    this.setState({modal: content})
  }

  updateFilms(films: ReactNode) {
    this.setState({films: films})
  }

  render() {
    return (
      <React.Fragment>
        <Core.ModalWidget active={this.state.modal != null} close={() => {
          this.setActiveModal(null)
        }}>
          {this.state.modal}
        </Core.ModalWidget>
        <Header app={this}/>
        <div className="flex flex-col items-center space-y-2">
          {this.state.films}
        </div>
        <Footer/>
      </React.Fragment>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementsByTagName("body")[0])
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
