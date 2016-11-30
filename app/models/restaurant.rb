class Restaurant < ApplicationRecord
    has_many :reviews
    belongs_to :category
    mount_uploader :main_image, MainImageUploader
end
