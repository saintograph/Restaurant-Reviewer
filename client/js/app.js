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
      fetch("/api/v1/restaurants/" + $('#restaurant_id').val() + "/reviews.json")
          .then( (response) => {
              return response.json() })   
                  .then( (json) => {
                      this.setState({ reviews: json });
                  });
  },
  
  handleSubmit: function(review) {
        this.setState({ reviews: [] })
        var newReviewState = this.state.reviews.concat(review);
        this.setState({ reviews: newReviewState })
  },

  
  render: function() {
    var reviewsState = this.state.reviews;
    reviewsState = reviewsState.map(function(review, index) {  
      return (
          <Reviews key = { index }
           singleReview = { review }
           />
      )
    });
    
    return (
      <div>
        <section className="block" id="reviews">
            <header className="clearfix">
                <h2 className="pull-left">Reviews</h2>
            </header>
            { reviewsState }
        </section>
        <ReviewForm handleSubmit = { this.handleSubmit } />
      </div>
    )
  } 
}); 

ReactDOM.render(<MainInterface />, document.getElementById('app'));
