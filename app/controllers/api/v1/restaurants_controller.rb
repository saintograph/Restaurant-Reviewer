class Api::V1::RestaurantsController < Api::V1::BaseController
   def index
	   respond_with Restaurant.all
   end
   def show
       @restaurant - Restaurant.find(params[:id])
       respond_with @reviews
   end
end