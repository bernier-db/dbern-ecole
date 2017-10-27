class Participant < ApplicationRecord

  belongs_to :game
  belongs_to :owner, :class_name => 'User', :foreign_key => :owner_id
  belongs_to :opponent, :class_name => 'User', :foreign_key => :opponent_id, optional: true
  belongs_to :winner, :class_name => 'User', :foreign_key => :winner_id, optional: true

  validates :owner_id, presence: true

#Participant.getStats(User.find(1))
  def self.getStats(user)
    user_id = user.id
    played = Game.joins("inner join participants on games.id = game_id")
                 .where("opponent_id = (?) OR winner_id = (?)", user_id, user_id)
                 .distinct
                 .select(:id, :title)
    playedArray = Array.new #pour le remplir en json en ajoutant des données

    played.each do |g|
      game_id = g.id
      g = g.attributes
      g['total'] = Participant.where("game_id = (?) AND (owner_id = (?) OR opponent_id = (?) )",game_id, user_id, user_id).count
      g['won']  = Participant.where("winner_id = (?) AND game_id = (?)",user_id, game_id).count
      playedArray.push(g)
    end
    return playedArray
  end

  #get open game by id
  def self.WaitingForOpponent(id)
    return Participant.where("game_id = ? AND status = 'waiting'", id)
  end

  def self.isPlaying(user_id, game_id)
    Participant.where("game_id = #{game_id} AND status <> 'ended' AND (owner_id = #{user_id} OR opponent_id = #{user_id})").first;
  end


end
