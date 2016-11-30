class Categories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :cuisine
      t.string :location
    end
  end
end
