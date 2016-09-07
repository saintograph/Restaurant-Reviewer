var React = require('react');
var StarRatingComponent = require('react-star-rating-component');

const ReviewForm = React.createClass({

    getInitialState: function() {
        return ({
            rating: 1
        })
    },

    onStarClick: function(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    },

    handleClick: function(event) {
        var form = document.getElementById('form-review');
        $.ajax({
            url: '/api/v1/restaurants/' + document.getElementById('restaurant_id').value + '/reviews',
            type: 'POST',
            data: {
                review: { 
                    rating : this.state.rating,
                    comment : this.refs.review.value,
                    restaurant_id : document.getElementById('restaurant_id').value
                }
            },
            beforeSend: function(jqXHR, settings) {
                jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
            },
            success: (review) => {
               this.props.handleSubmit(review);
               form.reset();
               this.setState({ rating: 1 });
            },
        });
        event.preventDefault();
    },
    
    render: function() {
        const { rating } = this.state;
        return (
            <div>
                <section>
                    <header>
                        <h2>Leave a Review</h2>
                    </header>
                    <form id="form-review" role="form" method="post" className="background-color-white">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <h2>Your rating: {this.state.rating}</h2>
                                    <StarRatingComponent 
                                        name="rating" 
                                        starCount={5}
                                        value={this.state.rating}
                                        onStarClick={this.onStarClick}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="form-review-message">Review</label>
                                    <textarea ref="review" className="form-control" id="form-review-message" name="form-review-message" rows="3" required=""></textarea>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-default" onClick={ this.handleClick }>Submit Review</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
});

module.exports =  ReviewForm;