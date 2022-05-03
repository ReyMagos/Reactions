import React, {ChangeEvent, ReactNode} from "react"
import ReactDOM from "react-dom/client"

import {
  Auth,
  Register,
  DropdownProvider,
  TextInput,
  Dropdown,
  FilmPreview,
  ModalWidget,
  ClassName,
  ReviewText
} from "./Core/Widgets"

import "./index.css"
import axios from "axios";

function loadFilms(inputText: string, updateDropdown: Function) {
  axios.post("/films", {text: inputText})
    .then(response => { console.log(response.data); updateDropdown(response.data.films.map(film => [film.id, <p>{film.name}</p>])) })
    .catch(error => console.log(error))
}

function loadReviews(id: any, updateFilms: Function) {
  axios.get(`/reviews/${id}`)
    .then(response => {
      updateFilms(
        <FilmPreview>
          {response.data.map((text, author) => <ReviewText text={text} author={author} />)}
        </FilmPreview>
      )
    })
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
                <Dropdown className="sh1 transition-all max-h-[30vh] overflow-y-auto"
                          active={flag} items={items} onSelect={id => loadReviews(id, props.app.updateFilms)} />
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

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.setActiveModal.bind(this)
    this.removePrevModal.bind(this)
    this.state = {
      films: [],
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

  updateFilms(films: ReactNode) {
    this.setState({
      films: films
    })
  }

  render() {
    return (
      <React.Fragment>
        <ModalWidget active={this.state.modal != null} close={() => {this.setActiveModal(null)}}>
          {this.state.modal}
        </ModalWidget>
        <Header app={this}/>
        <div className="flex flex-col items-center space-y-2">

        </div>
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
