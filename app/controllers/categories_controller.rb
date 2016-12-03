class CategoriesController < ApplicationController
    def index
        @categories = Category.all
    end
    def show
        @categories = Category.all
        @category = Category.find(params[:id])
        @restaurants = Restaurant.where(category_id: @category.id)
@recently_posted = Restaurant.order("created_at").limit(4)
    @recently_created = Restaurant.order("updated_at").limit(3)
    @recently_commented = Restaurant.includes(:reviews).order("created_at").limit(2).offset(1)
        # @restaurant = Restaurant.find(params[:category_id])
    end
    # def show_categories
    #     @categories = Category.all
    #     @category = Category.find(params[:id])
    #     @restaurant = Restaurant.find(params[:id])
    #     @restaurants = Restaurant.where(category_id: @category.id)
    #     render :partial => 'all'
    # end
end

