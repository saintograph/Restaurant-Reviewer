var React = require('react');

const ReviewForm = React.createClass({
    
    render: function() {
        return (
            <div>
                <section id="write-review">
                    <header>
                        <h2>Leave a Review</h2>
                    </header>
                    <form id="form-review" role="form" method="post" className="background-color-white">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="form-review-name">Name</label>
                                    <input type="text" className="form-control" id="form-review-name" name="form-review-name" required=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="form-review-email">Email</label>
                                    <input type="email" className="form-control" id="form-review-email" name="form-review-email" required=""/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="form-review-message">Message</label>
                                    <textarea className="form-control" id="form-review-message" name="form-review-message"  rows="3" required=""></textarea>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-default">Submit Review</button>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <aside className="user-rating">
                                    <label>Value</label>
                                    <figure className="rating active" data-name="value"></figure>
                                </aside>
                                <aside className="user-rating">
                                    <label>Service</label>
                                    <figure className="rating active" data-name="score"></figure>
                                </aside>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
});

module.exports =  ReviewForm;