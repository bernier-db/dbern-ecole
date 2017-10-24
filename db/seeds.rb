# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.create(title: :MemoDeck, description: "A game where you have to remember every moves you and tour opponnent made before seeing it happen!", image: "memoDec", );
Game.create(title: :TicTacToe, description: "An unbeatable classic game. Strategy at its best!", image: "tictactoe.png");
Game.create(title: :Games3, description: "bla blablablablabalbalbalbalablablablabla", image: "default.jpg");


User.create! :nom => 'Bernier', :prenom => 'Dave', :email => 'dave.bernier@dbern.net', :password => '123456', :password_confirmation => '123456'
User.create! :nom => 'Ricard', :prenom => 'Martin', :email => 'martin.ricard@dbern.net', :password => '123456', :password_confirmation => '123456'
User.create! :nom => 'St-Yves', :prenom => 'Mathieu', :email => 'mathieu.st-yves@dbern.net', :password => '123456', :password_confirmation => '123456'
User.create! :nom => 'Lafond ', :prenom => 'Emmanuel', :email => 'emmanuel.lafond@dbern.net', :password => '123456', :password_confirmation => '123456'
User.create! :nom => 'Courchesne', :prenom => 'Marie-Soleil', :email => 'marie-soleil.courchesne@dbern.net', :password => '123456', :password_confirmation => '123456'


Relationship.create(user_id: 1, friend_id: 2, status: :accepted)
Relationship.create(user_id: 2, friend_id: 3, status: :accepted)
Relationship.create(user_id: 3, friend_id: 4, status: :accepted)
Relationship.create(user_id: 4, friend_id: 5, status: :accepted)
Relationship.create(user_id: 5, friend_id: 1, status: :waiting)
Relationship.create(user_id: 1, friend_id: 3, status: :waiting)
Relationship.create(user_id: 1, friend_id: 4, status: :accepted)

Participant.create! :opponent_id => 1, :owner_id => 2, :game_id=>2, :winner_id => 1, :status => 'ended', :game_data => '{}', :waiting_for_user_id => 1
Participant.create(opponent_id: 3, owner_id: 2, game_id:2, winner_id: 2, status: 'ended', game_data: '{}', waiting_for_user_id: 1)
Participant.create(opponent_id: 1, owner_id: 2, game_id:1, winner_id: 1, status: 'ended', game_data: '{}', waiting_for_user_id: 1)
Participant.create(opponent_id: 1, owner_id: 2, game_id:1, winner_id: 2, status: 'ended', game_data: '{}', waiting_for_user_id: 1)
