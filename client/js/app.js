var React = require('react');
var ReactDOM = require('react-dom');
var ReviewForm = require('./components/review_form');
var Reviews = require('./components/reviews');

var MainInterface = React.createClass({
  render: function() {
    return (
      <div>
        <Reviews />
        <ReviewForm />
      </div>
    )
  } 
}); 

ReactDOM.render(<MainInterface />, document.getElementById('app'));
