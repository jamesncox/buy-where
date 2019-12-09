class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.integer :quantity
      t.belongs_to :store, foreign_key: true
    end
  end
end
