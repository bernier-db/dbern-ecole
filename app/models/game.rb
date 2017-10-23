class Game < ApplicationRecord
  has_many :participants


  def self.getSimpleInfosById(id)
    return Game.where("id = ?", id).select("id, title, description, image").first
  end

  def self.latest(limit)
    Game.from("(SELECT title, id, image FROM games ORDER BY created_at DESC)as games").group(:id).limit(limit)
  end

  def self.mostPopular(limit)
    Game.joins("INNER JOIN games ON games.id = O.game_id").from(Participant.select("game_id, COUNT(game_id) as count").group("game_id").order("count DESC").limit(limit),:O).select("title, games.id, image")
  end

  def self.currentlyPlayed(limit)
    Participant.where("status != 'ended'").select(:game_id).joins("INNER JOIN games on game_id = games.id").select("games.title, games.id").limit(limit)
  end

end
