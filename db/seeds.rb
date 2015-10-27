# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



User.create({ email: 'guest@gmail.com', password: 'Password1'})

coordinates = [
	[-1,2],
	[30,2],
	[65,28],
	[59,48],
	[80,40],
	[81,19],
	[56,86],
	[55,27],
	[40,90],
]

coordinates.each do |coordinate|
  Direction.create({position_x: coordinate[0], position_y: coordinate[1]})
end
