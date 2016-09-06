class Review < ApplicationRecord
    belongs_to :user
    belongs_to :restaurant
    validates :user_id, presence: true
    validates :user_id, presence: true
    # delegate :first_name, to: :user
    def first_name
        self.user.first_name
    end
end
