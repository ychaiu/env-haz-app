"use strict";

/* class start */
class Test extends React.Component {

  render() {
    // Use state in render method to change DOM
    return(
    <div id="root">hello!</div>);   
  }
}
/* class end */

ReactDOM.render(
  (
    <div>
      <Test />
    </div>
  ),
  document.getElementById('root'),
);