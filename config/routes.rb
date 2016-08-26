Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :restaurants do
    resources :reviews, except: [:show, :index]
  end  
  root 'restaurants#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
