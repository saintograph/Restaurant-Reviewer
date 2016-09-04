var React = require('react');
var ReactDOM = require('react-dom');
var ReviewForm = require('./components/review_form');
var Reviews = require('./components/reviews');

var MainInterface = React.createClass({
    
  getInitialState: function() {
      return({
          reviews: []
      })
  },
  
  componentDidMount: function() {
      fetch("/restaurants/" + $('#restaurant_id').val() + "/reviews.json")
          .then( (response) => {
              return response.json() })   
                  .then( (json) => {
                      this.setState({ reviews: json });
                  });
  },
  
  render: function() {
    var reviewsState = this.state.reviews;
    reviewsState = reviewsState.map(function(review, index) {  
      return (
          <Reviews key = { index }
           singleReview = { review }
           />
      )
    }.bind(this));
    
    return (
      <div>
        { reviewsState }
        <ReviewForm />
      </div>
    )
  } 
}); 

ReactDOM.render(<MainInterface />, document.getElementById('app'));
