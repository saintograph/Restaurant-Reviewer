# Restaurant Reviewer
An accessible Yelp(ish) clone. Provides reviews, details and star ratings. Built with React and Rails.
## Installation
Please ensure Rails 5 and Ruby 2.2.2++ is installed on your machine.

1. git clone https://github.com/winfredselwyn/Restaurant-Reviewer.git
2. cd Restaurant-Reviewer
3. bundle install
4. npm install
5. gulp js (compiles client to assets/javascripts/)
6. rails s
7. navigate to localhost:3000

## Usage

To build the app for deployment (Heroku, etc), please run:

1. RAILS_ENV=production bundle exec rails assets:precompile --trace

## License
MIT