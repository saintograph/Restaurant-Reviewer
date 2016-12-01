class CategoriesController < ApplicationController
    def index
        @categories = Category.all
    end
    def show
        @categories = Category.all
        @category = Category.find(params[:id])
        @restaurants = Restaurant.where(category_id: @category.id)
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

