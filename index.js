import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
import axios from 'axios';
// import useFetch from './hooks/useFetch';

class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "puts 'happy' \n",
      theme: "vs-dark",
      codeResponse: null,
    };
  }

  onChange = (newValue) => {
    // console.log("onChange", newValue); // eslint-disable-line no-console
    this.setState({ code: newValue });
  };

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    console.log("editorDidMount=======>", editor);
    this.editor = editor;
  };

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue("// code changed! \n");
    }
  };

  changeBySetState = () => {
    this.setState({ code: "// code changed by setState! \n" });
  };

  setDarkTheme = () => {
    this.setState({ theme: "vs-dark" });
  };

  setLightTheme = () => {
    this.setState({ theme: "vs-light" });
  };

  getData = () => {
    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      headers: { 
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'

      },
      body: JSON.stringify({
	content: this.state.code,
	language: 'pseudocode'
      })
    }
    fetch('https://localhost:44306/api/code', requestOptions)
      .then(response => {
	console.log(response.json());
	// response.json()
      })
      .catch(err => console.error(err))
      // .then(data => this.setState({ codeResponse: data }));
  }

  componentDidMount = () => {
    console.log('Trying to send the request');

    /*axios.post('https://localhost:44306/api/code', { "content": "puts 'hello friend'",
    "language": "ruby" })
      .then(res => {
	console.log(res)
      })
    */


    /*const user = {
      name: this.state.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      */


    // POST method
    const requestOptions = {
      method: 'POST',
//      mode: 'no-cors',
      headers: { 
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
	content: 'encode this text cause is gonna bring problems',
	language: 'pseudocode'
      })
    }
    // https://localhost:44306
    fetch('https://localhost:44306/api/code', requestOptions)
      .then(response => response.json())
      .then(data => {
	this.setState({ codeResponse: data.content })
	console.log(codeResponse)
      });
      
    // console.log(response);
    // Simple GET request using fetch
    /*fetch('https://api.npms.io/v2/search?q=react')
      .then(response => response.json())
      .then(data => this.setState({ codeResponse: data.total }));*/
  }

  render() {
    const { code, theme, codeResponse } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
    };
    return (
      <div>
        <div>
          <button onClick={this.changeEditorValue} type="button">
            Change value
          </button>
          <button onClick={this.changeBySetState} type="button">
            Change by setState
          </button>
          <button onClick={this.setDarkTheme} type="button">
            Set dark theme
          </button>
          <button onClick={this.setLightTheme} type="button">
            Set light theme
          </button>
        </div>
        <hr />
        <MonacoEditor
          height="400"
          language="javascript"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          theme={theme}
        />
	<div>
	  <button onClick={this.getData} type="button">
	    RUN CODE
	  </button>
	  <p>Code Response: { codeResponse }</p>
	</div>
      </div>
    );
  }
}

const App = () => (
  <div>
    <h2>ReactJS with Monaco Editor - AJPD</h2>
    <CodeEditor />
  </div>
);

render(<App />, document.getElementById("root"));
