var React = require('react');
var ReactDOM = require('react-dom');
var CommentForm = require('./components/comment_form');

var MainInterface = React.createClass({
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
                <figure className="author">
                    <div className="date">12.05.2014</div>
                </figure>
                <div className="wrapper">
                    <h5>Catherine Brown</h5>
                    <figure className="rating big color" data-rating="4"></figure>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla vestibulum, sem ut sollicitudin consectetur, augue diam ornare massa,
                        ac vehicula leo turpis eget purus. Nunc pellentesque vestibulum mauris,
                        eget suscipit mauris imperdiet vel. Nulla et massa metus.
                    </p>
                    <div className="individual-rating">
                        <span>Value</span>
                        <figure className="rating" data-rating="4"></figure>
                    </div>
                    <div className="individual-rating">
                        <span>Service</span>
                        <figure className="rating" data-rating="4"></figure>
                    </div>
                </div>
            </article>
          </section>
        </section>
        <CommentForm />
      </div>
    )
  } 
}); 

ReactDOM.render(<MainInterface />, document.getElementById('app'));
