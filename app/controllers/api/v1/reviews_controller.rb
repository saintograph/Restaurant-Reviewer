class Api::V1::ReviewsController < Api::V1::BaseController
    def index
    #    @restaurant = Restaurant.find(params[:id])
    #    @review.restaurant_id = @restaurant.id
    #    @reviews = Review.where(restaurant_id: @restaurant.id)
    #    respond_with(@reviews) 
        @restaurant = Restaurant.find(params["id"])
        @review.restaurant_id = @restaurant.id
        @reviews = Review.where(restaurant_id: @restaurant.id)
        respond_with(@reviews)  
        # respond_with Review.all
    end
    def show
        
    end
end