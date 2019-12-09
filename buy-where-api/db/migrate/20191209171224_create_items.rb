class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :quantity
      t.float :price
      t.belongs_to :stores, foreign_key: true
    end
  end
end
