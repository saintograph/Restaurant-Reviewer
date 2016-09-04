Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :restaurants do
    resources :reviews#, except: [:show, :index]
  end  
  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :reviews do
          #get 'index', to: :show, controller: 'reviews'
        end
      end
    end
  end
  root 'restaurants#index'
end
