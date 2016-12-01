var React = require('react');
var ReactDOM = require('react-dom');
var StarRatingComponent = require('react-star-rating-component');

const AverageRating = React.createClass({
    
    getInitialState: function() {
        return ({
            rating: document.getElementById('avg_rating').value
        })
    },

  
    render: function() {
        return (
            <div role="rating">
                <StarRatingComponent 
                    name="avg_rating" 
                    starCount={5}
                    editing={false}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        )
    } 
}); 

ReactDOM.render(<AverageRating />, document.getElementById('average_rating'));
