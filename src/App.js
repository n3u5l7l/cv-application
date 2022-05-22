import React, {Component} from "react";
import Info from "./components/Info";
import Experience from "./components/Experience";
import Education from "./components/Education";

class App extends Component{
  constructor(){
    super();
  }

  render(){
    return (
    <div className="App">
      <Info />
      <Experience />
      <Education />
    </div>
    );
  }
}

export default App;
