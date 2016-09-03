class Restaurant < ApplicationRecord
    has_many :reviews
    mount_uploader :main_image, MainImageUploader
end
