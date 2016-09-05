class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :reviews, dependent: :destroy
  
  validates :first_name, presence: true
  
  # render user 'first_name' in erb template when <% current_user %> is called
  def to_s
    first_name
  end
end
