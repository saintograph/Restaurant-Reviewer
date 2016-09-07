var React = require('react');
var StarRatingComponent = require('react-star-rating-component');


const Reviews = React.createClass({
    
    render: function() {
            
        return (
            <div>
                <section className="reviews">
                    <article className="review">
                        <div className="wrapper">
                            <StarRatingComponent 
                                name="rate2" 
                                editing={false}
                                value={this.props.singleReview.rating}
                                starCount={5}
                            />
                            <p>{this.props.singleReview.comment}</p>
                            <h5>{ this.props.singleReview.user.first_name }</h5>
                            <div>Reviewed on: <p className="date">{ this.props.singleReview.created_at }</p></div>
                        </div>
                    </article>
                </section> 
            </div>
        )
    }
});

module.exports =  Reviews;