var React = require('react');

const Reviews = React.createClass({
    
    getInitialState: function() {
        return({
            reviews: []
        })
    },
    
    componentDidMount: function() {
        fetch("/api/v1/restaurants/" + "restaurant_id" + "/reviews.json")
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({ reviews: json });
                    });
    },
    
    render: function() {
        
        var reviews = this.state.reviews.map((review) => { 
            return ( 
                <div key={review.id}> 
                    <h3>{review.comment}</h3> 
                    <p>{review.rating}</p> 
                </div> 
                ) 
            }); 
            
        return (
            <div>
                <div>
                    { reviews }
                </div> 
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
                                <div>Reviewed on: <p className="date">12.05.2014</p></div>
                                <figure className="rating big color" data-rating="4"></figure>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nulla vestibulum, sem ut sollicitudin consectetur, augue diam ornare massa,
                                    ac vehicula leo turpis eget purus. Nunc pellentesque vestibulum mauris,
                                    eget suscipit mauris imperdiet vel. Nulla et massa metus.
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