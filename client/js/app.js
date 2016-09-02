var React = require('react');
var ReactDOM = require('react-dom');

var MainInterface = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Comments</h1>
      </div>
    )
  } 
}); 

ReactDOM.render(<MainInterface />, document.getElementById('app'));
