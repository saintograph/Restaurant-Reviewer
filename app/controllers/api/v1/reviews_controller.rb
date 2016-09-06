class Api::V1::ReviewsController < Api::V1::BaseController
    def index
        @reviews = Restaurant.find(params[:restaurant_id]).reviews
        render json: @reviews.to_json(include: [:user])
    end
    
    def create
        # respond_with :api, :v1, Review.create(review_params)
        @review = :api, :v1, Review.create(review_params.merge(user_id: current_user.id))# .merge(user_id: current_user.id)
        @reviews = Restaurant.find(params[:restaurant_id]).reviews
        # respond_with reviews, json:reviews 
        render json: @reviews.to_json(include: [:user])
    end

    def show
    end
   
    private
    
    def review_params
        params.require(:review).permit(:rating, :comment, :restaurant_id)
    end

end