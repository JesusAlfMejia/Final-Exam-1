import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      libros = [],
      errMensaje = ""
    }
  }

  submitBtnPressed = (event) => {
    event.prenventDefault();
    let settings = {
      Method = "GET"
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${event.target.nombreLibro.value}+intitle=${event.target.nombreLibro.value}`;

    fetch(url, settings)
      .then(response => {
        if(response.ok){
          return response.json()
        }
        else{
          throw new Error(response.statusText)
        }
      })
      .then(responseJson => {
        if(responseJson.length <= 0){
          this.setState({
            libros: [],
            errMensaje: `No hay libros con el nombre de ${event.target.nombreLibro.value}`
          })
        }
        else{
          this.setState({
            libros : responseJson,
            errMensaje : ""
          })
        }
      })
      .catch(err =>{
        this.setState({
          libros: [],
          errMensaje = err.message
        })
      })
  }

  render(){
    return(
      <div>
        <BookForm onSubmit={this.submitBtnPressed}/>
        {
          
        }
      </div>
    )
  }

}

export default App;
