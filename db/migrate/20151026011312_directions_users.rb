class DirectionsUsers < ActiveRecord::Migration
  def change
  	create_table :directions_users, :id => false do |t|
       t.references :direction, :user
    end
    add_index :directions_users, [:direction_id, :user_id]
  end
end
