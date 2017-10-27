class GameController < ApplicationController
  before_action :sanitize_get_params, only: [:get, :play]
  before_action :sanitize_win_params, only: [:win]

  before_action :authenticate_user, except: [:get, :getAllgames]

#GET
  def get
    id = params[:id]
    game = Game.getSimpleInfosById(id)
    players = User.getPlayersByGame(id)


    render :json => {ok: true, data: game, players: players}
  end

#/games/getAllGames
  def getAllgames
    games = Game.all.order('title ASC')

    render :json => {ok: true, games: games}
  end


########### join or host###########
#POST /games/:id/play
  def play
    game_id = params[:id]
    user_id = current_user.id

    if (!(playing = Participant.isPlaying(user_id, game_id)).blank?)

      render :json => {state: "already playing", data: playing}
      return
    end

    openedGames = Participant.WaitingForOpponent(game_id)

    if (openedGames.count > 0)
      game = openedGames[0]


      game.opponent_id = user_id
      game.status = 'playing'
      game.waiting_for_user_id = game.owner_id

      game.save
      render :json => {state: 'joining', data: openedGames[0]}
      return

    else
      joust = Participant.new({status: 'waiting', owner_id: user_id, game_id: game_id, game_data: {}})
      joust.save!
      render :json => {state: "hosting", data: joust}
      return
    end
  end


#POST /game/:joust_id/win
  def win
    joust_id = params[:joust_id]
    user_id = current_user.id

    joust = Participant.find(joust_id);

    if (joust.owner_id != user_id && joust.opponent_id != user_id)
      return head :unauthorized

    end

    joust.winner_id = user_id
    joust.status = 'ended'
    joust.save!

    render :json => {state: 'won', data: joust}
    return
  end


  private

  def sanitize_get_params
    params.require(:id)
    params.permit(:id)
  end

  def sanitize_win_params
    params.require(:joust_id)
    params.permit(:joust_id)
  end
end
