class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

#Amitiées
  has_many :relationships
  has_many :friends, through: :relationships

  has_many :inverse_relationships, :class_name => "Relationship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_relationships, :source => :user

  def self.allFriends(id)
    User.find(id).friends.where("relationships.status = 'accepted'").select("relationships.id as rel_id, users.*") +
        User.find(id).inverse_friends.where("relationships.status = 'accepted'").select("relationships.id as rel_id, users.*")
  end

  def self.PendingRecRequests(id)
    User.find(id).inverse_friends.where("relationships.status = 'waiting'").select("relationships.id as rel_id, users.*")

  end
  def self.PendingSendRequests(id)
    User.find(id).friends.where("relationships.status = 'waiting'").select("relationships.id as rel_id, users.*")
  end

#Relations pour les parties jouées
  has_many :won_games, :class_name => "Participant", :foreign_key => "winner_id"
  has_many :owning_games, :class_name => "Participant", :foreign_key => "owner_id"
  has_many :opponing_games, :class_name => "Participant", :foreign_key => "opponent_id"

  def self.total_played
    Participant.where("owner_id = ? OR opponent_id = ?", self.id, self.id)
  end

  def self.played_games
    Game.joins("inner join participants on games.id = game_id").where("opponent_id = ? OR winner_id = ?", self.id, self.id).distinct
  end

  def self.getPlayersByGame(game_id)
    User.joins("inner join participants on (users.id = participants.owner_id OR users.id = opponent_id)").where("game_id = ? AND status != 'ended'", game_id).select("nom, prenom, users.id")
  end


end
