var React = require('react');

const ReviewForm = React.createClass({
    getInitialState: function () {
        return {value: null}; 
    },
    handleClick: function(event) {
      event.preventDefault();
        $.ajax({
            url: '/api/v1/restaurants/' + document.getElementById('restaurant_id').value + '/reviews',
            type: 'POST',
            data: {
                review: { 
                    rating : this.refs.rating.value,
                    comment : this.refs.review.value,
                    restaurant_id : document.getElementById('restaurant_id').value
                }
            },
            beforeSend: function(jqXHR, settings) {
                jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
            },
            success: (review) => {
               this.props.handleSubmit(review)
            },
      });
      this.setState({value: null}); 
    },
    
    render: function() {
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
                                    <label htmlFor="form-review-email">Rating</label>
                                    <input ref="rating" type="number" className="form-control" id="form-review-email" name="form-review-email" value={this.state.value} required=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="form-review-message">Review</label>
                                    <textarea ref="review" className="form-control" id="form-review-message" name="form-review-message"  rows="3" required=""></textarea>
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