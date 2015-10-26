class Direction < ActiveRecord::Base
	validates :position_x,:position_y, presence: true
	validates :position_x, uniqueness: {scope: :position_y}
	has_and_belongs_to_many :users  
	MAXIMUM_USER_GUESSES = 5
end
