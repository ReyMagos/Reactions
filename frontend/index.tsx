import React from "react"
import ReactDOM from "react-dom/client"

import * as Core from "./Core/Widgets"

import "./index.css"

const Header = (props: { app: any }) => {
  const dropdownRef = React.createRef<Core.Dropdown>()

  return (
    <header className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-2/3 h-11">
        <h1 className="text-2xl">Reactions</h1>
        <div className="flex items-center space-x-2">
          <button className="p-0.5" onClick={() => {
            props.app.setActiveModal(<Core.Auth app={this}/>)
          }}>Sign in
          </button>
          <button className="p-0.5" onClick={() => {
            props.app.setActiveModal(<Core.Register app={this}/>)
          }}>Register
          </button>
        </div>
      </div>
      <div className="w-2/3">
        <Core.TextInput variant="solid" dropdown={dropdownRef} className="w-full p-1" placeholder="Search for films"/>
        <Core.Dropdown ref={dropdownRef} onSelect={() => console.log("SELECTED!")} />
      </div>
      <div className="w-1/2 mt-2">
        <p className="text-lg text-center leading-tight">
          This is not a real project. Only your imagination can bring it to the real world
        </p>
      </div>
    </header>
  )
}

const FilmList = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Core.FilmPreview/>
      <Core.FilmPreview/>
      <Core.FilmPreview/>
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
    this.setState({
      prevModal: null
    })
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
        <FilmList/>
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
