import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    element_field: [],    
    element_texarea: '',
    length_field: [],
    length_textarea: '',
    data_field: [],
    data_textarea: '',
    object_name: '',    
    click: false
  }  
  
  generateXSD = () => {
    console.log(this.state.element_field, this.state.length_field);
    
    let xsd_begin_wrapper = '';
    let xsd_end_wrapper = '';
    xsd_begin_wrapper = `<?xml version="1.0" encoding="UTF-8" ?>
    <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            xmlns:nxsd="http://xmlns.oracle.com/pcbpel/nxsd"
            xmlns:tns="http://www.oracle.com/FTPAdapter"
            targetNamespace="http://www.oracle.com/FTPAdapter"
            elementFormDefault="qualified"
            attributeFormDefault="unqualified"
            nxsd:version="NXSD"
            nxsd:stream="chars"
            nxsd:encoding="US-ASCII">
        
    <xsd:element name="${this.state.object_name}">
    <xsd:complexType>
			<xsd:choice minOccurs="0" maxOccurs="unbounded" nxsd:choiceCondition="fixedLength" nxsd:length="0">
				<xsd:element name="${this.state.object_name}_RECORD" nxsd:style="array" nxsd:cellSeparatedBy="\${eol}" nxsd:conditionValue="">
					<xsd:complexType>
            <xsd:sequence>`;
    
    xsd_end_wrapper = `</xsd:sequence>
    </xsd:complexType>
    </xsd:element>
    </xsd:choice>
    </xsd:complexType>
    </xsd:element>
    </xsd:schema>`;
    // console.log(xsd_begin_wrapper+xsd_end_wrapper);

    let element_field = [...this.state.element_field];
    let length_field = [...this.state.length_field];
    let elements = '';

    if (element_field.length === length_field.length) {

      element_field.map((item, index) => {
        item.split("_")[1] === 'Blank' || item.split("_")[1] === 'Default'
        ? elements += `<xsd:element name="${item}" type="xsd:string" nxsd:style="fixedLength" nxsd:length="${length_field[index].split("_")[1]}" nxsd:padStyle="tail" />\n`
        : elements += `<xsd:element name="${item}" type="xsd:string" nxsd:style="fixedLength" nxsd:length="${length_field[index].split("_")[1]}" />\n`;
        return null;
      })
    }
    // console.log(elements);
    this.downloadFile(this.state.object_name, xsd_begin_wrapper+elements+xsd_end_wrapper, 'text/xml', 'xsd');
    // return <div><h1>12345456</h1></div>;
  }

  generateSampleFile(){
    let data  = '';
    let data_field = [...this.state.data_field];
    let length_field = [...this.state.length_field];

    data_field.map((item, index) => {
      // console.log('length_field[index]', length_field[index]);
      // console.log(item.padStart(length_field[index], ' '));
      item.split("_")[1] === 'Amt'
      ? data += item.split("_")[0].toString().padStart(length_field[index].split("_")[1], '0')
      : (
        item === 'Blank'
        ? data += ''.padEnd(length_field[index], " ")
        : data += item.toString().padEnd(length_field[index].split("_")[1], " ")
        );
      return null;
    });

    this.downloadFile(this.state.object_name+' Data', data, 'text/plain', 'txt');
  }

  downloadFile = (filename, content, content_type, file_extension) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: content_type});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.${file_extension}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  onFieldInputChange = (event) => {
    this.setState({element_texarea: event.target.value, click: false});
  }

  onLengthInputChange = (event) => {
    this.setState({length_textarea: event.target.value, click: false});
  }

  onDataInputChange = (event) => {
    this.setState({data_textarea: event.target.value, click: false});
  }

  onObjectInputChange = (event) => {
    this.setState({object_name: event.target.value, click: false});
  }

  onGenerateClick = () => {
    let elem_value = this.state.element_texarea.replace(/^\s*$(?:\r\n?|\n)/gm,'').trim().split('\n');
    elem_value = elem_value.map((item, index) => 'f' + (index + 1).toString().concat('_',item.replace(/ /g,'_')));

    let length_value = this.state.length_textarea.replace(/^\s*$(?:\r\n?|\n)/gm,'').trim().split('\n');
    length_value = length_value.map((item, index) => 'f' + (index + 1).toString().concat('_',item.replace(/ /g,'_')));

    // this.setState({element_field: elem_value, length_field: length_value, click: true});
    this.setState({element_field: elem_value, length_field: length_value}, function() {
      this.generateXSD();
    });
  }

  onGenerateDataClick = () => {
    // console.log(this.state.data_textarea);
    let data_value = this.state.data_textarea.replace(/^\s*$(?:\r\n?|\n)/gm,'').trim().split('\n');

    this.setState({data_field: data_value}, function(){
      this.generateSampleFile();
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Generate Damn XSD for CNB</h1>          
          <input type="text" placeholder='Enter Object RICE ID' className='input_text' onChange={this.onObjectInputChange}/>
          <button className="success" onClick={this.onGenerateClick}>Generate</button>
          <button className="success" onClick={this.onGenerateDataClick}>Generate Sample Data</button>
        </header>
        <div className='fields'>
          <div className='fields_area'>
            <h2>Copy/Paste field names here:</h2>
            <textarea name="fields" id="fields_id" cols="40" rows="25" onChange={this.onFieldInputChange}></textarea>
          </div>
          <div className='length_area'>
            <h2>Copy/Paste field lenghts here: </h2>
            <textarea name="length" id="length_id" cols="20" rows="25" onChange={this.onLengthInputChange}></textarea>
          </div>
          <div className='data_area'>
            <h2>Copy/Paste field data here: </h2>
            <textarea name="data" id="data_id" cols="20" rows="25" onChange={this.onDataInputChange}></textarea>            
          </div>
        </div>
      </div>
    )
  }
}

export default App;
