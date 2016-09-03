class AddMainImageToRestaurant < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurants, :main_image, :string
  end
end
