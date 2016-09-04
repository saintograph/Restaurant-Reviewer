var React = require('react');

const Reviews = React.createClass({
    
    render: function() {
            
        return (
            <div>
                <section className="block" id="reviews">
                    <header className="clearfix">
                        <h2 className="pull-left">Reviews</h2>
                        <a href="#write-review" className="btn framed icon pull-right roll">Write a review <i className="fa fa-pencil"></i></a>
                    </header>
                    <article className="clearfix overall-rating">
                        <strong className="pull-left">Overall Rating</strong>
                        <figure className="rating big color pull-right" data-rating="4"></figure>
                    </article>
                    <section className="reviews">
                        <article className="review">
                            <div className="wrapper">
                                <h5>Catherine Brown</h5>
                                <div>Reviewed on: <p className="date">{ this.props.singleReview.created_at }</p></div>
                                <figure className="rating big color" data-rating="4">{this.props.singleReview.rating}</figure>
                                <p>
                                    {this.props.singleReview.comment}
                                </p>
                            </div>
                        </article>
                    </section> 
                </section>
            </div>
        )
    }
});

module.exports =  Reviews;