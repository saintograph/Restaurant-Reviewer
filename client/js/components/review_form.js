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
    
    starRating: function(value) {
        console.log(value)
        this.setState({
            rating: value
        })
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
                            <fieldset className="starability-basic">
                                <legend>First rating:</legend>
                                    <input type="radio" id="first-rate5" name="rating" value="5" onClick={this.starRating.bind(null, 5)} onKeyUp={this.starRating.bind(null, 5)} />
                                    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                                    <input type="radio" id="first-rate4" name="rating" value="4" onClick={this.starRating.bind(null, 4)} onKeyUp={this.starRating.bind(null, 4)} />
                                    <label htmlFor="first-rate4" title="Very good">4 stars</label>
                                    <input type="radio" id="first-rate3" name="rating" value="3" onClick={this.starRating.bind(null, 3)} onKeyUp={this.starRating.bind(null, 3)} />
                                    <label htmlFor="first-rate3" title="Average">3 stars</label>
                                    <input type="radio" id="first-rate2" name="rating" value="2" onClick={this.starRating.bind(null, 2)} onKeyUp={this.starRating.bind(null, 2)} />
                                    <label htmlFor="first-rate2" title="Not good">2 stars</label>
                                    <input type="radio" id="first-rate1" name="rating" value="1" onClick={this.starRating.bind(null, 1)} onKeyUp={this.starRating.bind(null, 1)} />
                                    <label htmlFor="first-rate1" title="Terrible">1 star</label>
                            </fieldset>

                                <div className="form-group" role="form">
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