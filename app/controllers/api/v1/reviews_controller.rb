class Api::V1::ReviewsController < Api::V1::BaseController
    def index
        respond_with Review.all
    end
    def show
        
    end
end