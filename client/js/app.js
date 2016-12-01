var React = require('react');
var ReactDOM = require('react-dom');
var ReviewForm = require('./components/review_form');
var Reviews = require('./components/reviews');
var StarRatingComponent = require('react-star-rating-component');


const MainInterface = React.createClass({
    
  getInitialState: function() {
      return({
          reviews: []
      })
  },
  
  componentDidMount: function() {
      fetch("/api/v1/restaurants/" + document.getElementById('restaurant_id').value + "/reviews.json")
          .then( function(response) {
              return response.json() })   
                  .then( function(json) {
                      this.setState({ reviews: json });
                  });
  },
  
  handleSubmit: function(review) {
        this.setState({reviews: []})
        let newReviewState = this.state.reviews.concat(review);
        this.setState({ reviews: newReviewState })
  },

  
  render: function() {
    let reviewsState = this.state.reviews;
    reviewsState = reviewsState.map(function(review, index) {  
      return (
          <Reviews key = { index }
           singleReview = { review }
           />
      )
    });
    
    const sign_in = (<div><h3>Please sign in or register to leave a review</h3></div>);
    
    return (
      <div>
        <section className="block" id="reviews">
            <header className="clearfix">
                <h2 className="pull-left">Reviews</h2>
            </header>
            { reviewsState }
        </section>
        {document.getElementById('current_user').value == "" ? sign_in : <ReviewForm handleSubmit = { this.handleSubmit } />}
      </div>
    )
  } 
}); 

ReactDOM.render(<MainInterface />, document.getElementById('app'));


const AverageRating = React.createClass({
  
    render: function() {
        return (
            <div>
            <StarRatingComponent 
                name="avg_rating" 
                starCount={5}
                editing={false}
                value={Number(document.getElementById('avg_rating').value)}
            />
            </div>
        )
    } 
}); 

ReactDOM.render(<AverageRating />, document.getElementById('average_rating'));