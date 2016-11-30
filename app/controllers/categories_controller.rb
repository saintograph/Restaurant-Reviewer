class CategoriesController < ApplicationController
    def index
        @categories = Category.all
    end
    def show
        @categories = Category.all
        @category = Category.find(params[:id])
        @restaurants = Restaurant.where(category_id: @category.id)
        @restaurant = Restaurant.find(params[:id])
    end
    def show_categories
        @categories = Category.all
        @category = Category.find(params[:id])
        @restaurant = Restaurant.find(params[:id])
        @restaurants = Restaurant.where(category_id: @category.id)
        render :partial => 'all'
    end
end

  def show
    @reviews = Review.where(restaurant_id: @restaurant.id)
    @restaurant = Restaurant.find(params[:id])
    if @reviews.blank?
        @avg_rating = 0
    else
        @avg_rating = @reviews.average(:rating)
    end
  end
