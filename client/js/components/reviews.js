var React = require('react');

const Reviews = React.createClass({
    
    render: function() {
            
        return (
            <div>
                <section className="reviews">
                    <article className="review">
                        <div className="wrapper">
                            <h5>{ this.props.singleReview.user.first_name }</h5>
                            <div>Reviewed on: <p className="date">{ this.props.singleReview.created_at }</p></div>
                            <figure className="rating big color" data-rating="4">{this.props.singleReview.rating}</figure>
                            <p>
                                {this.props.singleReview.comment}
                            </p>
                        </div>
                    </article>
                </section> 
            </div>
        )
    }
});

module.exports =  Reviews;