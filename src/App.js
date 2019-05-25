import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    element_field: [],
    length_field: [],
    element_texarea: '',
    length_textarea: ''
  }
  
  generateXSD = () => {
    console.log(this.state.element_field);
    this.downloadTxtFile();
  }

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([this.state.element_field], {type: 'text/xml'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.xsd";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  onDataInputChange = (event) => {
    this.setState({element_texarea: event.target.value});
  }

  onGenerateClick = () => {
    let elem_value = this.state.element_texarea.replace(/^\s*$(?:\r\n?|\n)/gm,'').trim().split('\n');
    elem_value = elem_value.map((item, index) => 'f' + (index + 1).toString().concat('_',item.replace(/ /g,'_')));
    this.setState({element_field: elem_value}, function() {
      this.generateXSD();
    });    
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Generate Damn XSD for CNB</h1>
          <button className="success" onClick={this.onGenerateClick}>Generate</button>
        </header>
        <div className='fields'>
          <div className='fields_area'>
            <h2>Copy/Paste field names here:</h2>
            <textarea name="fields" id="fields_id" cols="40" rows="30" onChange={this.onDataInputChange}></textarea>
          </div>
          <div className='length_area'>
            <h2>Copy/Paste field lenghts here: </h2>
            <textarea name="fields" id="fields_id" cols="20" rows="30"></textarea>
          </div>
        </div>      
      </div>
    )
  }
}

export default App;
