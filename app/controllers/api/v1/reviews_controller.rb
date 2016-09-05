class Api::V1::ReviewsController < Api::V1::BaseController

    def index
        @reviews = Restaurant.find(params[:restaurant_id]).reviews
        render json: @reviews.to_json(include: [:user, :restaurant])
    end
    
    def create
        respond_with :api, :vi, Review.create(review_params)
    end

    def show
    end
    
    private
    
    def review_params
        params.require(:review).permit(:rating, :review, :user_id, :restaurant_id)
    end
    
end