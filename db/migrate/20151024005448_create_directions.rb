class CreateDirections < ActiveRecord::Migration
  def change
    create_table :directions do |t|
      t.integer :position_x
      t.integer :position_y

      t.timestamps null: false
    end
  end
end
