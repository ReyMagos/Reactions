import React, {ChangeEvent} from "react"
import ReactDOM from "react-dom/client"

import {Auth, Register, DropdownProvider, TextInput, Dropdown, FilmPreview, ModalWidget, ClassName} from "./Core/Widgets"

import "./index.css"
import axios from "axios";

function loadFilms(inputText: string, updateDropdown: Function) {
  axios.post("/films", {text: inputText})
    .then(response => { updateDropdown(response.data.films.map(film => <p>{film}</p>)) })
    .catch(error => console.log(error))
}

const Header = (props: { app: any }) => {
  return (
    <header className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-2/3 h-11">
        <h1 className="text-2xl">Reactions</h1>
        <div className="flex items-center space-x-2">
          <button className="p-0.5" onClick={() => {
            props.app.setActiveModal(<Auth app={props.app}/>)
          }}>Sign in
          </button>
          <button className="p-0.5" onClick={() => {
            props.app.setActiveModal(<Register app={props.app}/>)
          }}>Register
          </button>
        </div>
      </div>
      <div className="w-2/3">
        <DropdownProvider>
          {(active, setActive, items, updateItems) => {
            const flag = active && items.length > 0
            return (
              <React.Fragment>
                <TextInput variant="solid" className={ClassName.apply("w-full p-1").applyWhen("dock sh1", flag).asString()}
                           placeholder="Search for films" onFocus={() => setActive(true)} onBlur={() => setActive(false)}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => loadFilms(event.target.value, updateItems)} />
                <Dropdown className="sh1 transition-all max-h-[30vh] overflow-y-auto" active={flag} items={items} />
              </React.Fragment>
            )
          }}
        </DropdownProvider>
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

const FilmList = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FilmPreview/>
      <FilmPreview/>
      <FilmPreview/>
    </div>
  )
}

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.setActiveModal.bind(this)
    this.removePrevModal.bind(this)
    this.state = {
      prevModal: null,
      modal: null
    }
  }

  __setActiveModalAnimated(content: JSX.Element) {
    if (content == null) {
      this.setState({
        prevModal: null,
        modal: null
      })
    } else {
      this.setState({
        prevModal: this.state.modal,
        modal: content
      })
    }
  }

  setActiveModal(content: JSX.Element) {
    this.setState({modal: content})
  }

  removePrevModal() {
    this.setState({ prevModal: null })
  }

  render() {
    return (
      <React.Fragment>
        <ModalWidget active={this.state.modal != null} close={() => {this.setActiveModal(null)}}>
          {this.state.modal}
        </ModalWidget>
        <Header app={this}/>
        <FilmList/>
        <Footer />
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
