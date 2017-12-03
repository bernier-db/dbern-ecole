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
#POST /games/play/start:id
  def play
    game_id = params[:id]
    user_id = current_user.id
#already playing
    if (!(playing = Participant.isPlaying(user_id, game_id)).blank?)
      otherPlayer = playing.owner_id === user_id ? playing.opponent_id : playing.owner_id
      if otherPlayer != nil
        other = User.find(otherPlayer)
      else
        other = nil
      end
      render :json => {ok: true, state: "already playing", data: playing, opponent: other, myId: current_user.id}
      return
    end

    openedGames = Participant.WaitingForOpponent(game_id)
#join
    if openedGames.count > 0
      game = openedGames[0]

      game.opponent_id = user_id
      game.status = 'playing'
      game.waiting_for_user_id = game.owner_id

      game.save

      owner = User.find(game.owner_id)
      render :json => {ok: true, state: 'joining', data: game, opponent: owner, myId: current_user.id}
      return
#host
    else

      joust = Participant.new({status: 'waiting', owner_id: user_id, game_id: game_id, game_data: {}, waiting_for_user_id: 0})
      if joust.save!

        render :json => {ok: true, state: 'hosting', data: joust, myId: current_user.id}
        return
      end
      render :json => {ok: false}
    end
  end


#POST /game/win/:joustId
  def win
    joust_id = params[:joust_id]
    game_data = params[:gameData]
    user_id = current_user.id

    joust = Participant.find(joust_id)
    if joust.owner_id != user_id && joust.opponent_id != user_id
      return head :unauthorized

    end

    joust.winner_id = user_id
    joust.status = 'ended'
    joust.game_data = game_data
    if joust.save!
      render :json => {ok: true, state: 'won', data: joust}
    else
      render :json => {ok:false}
    end
  end

#POST /games/forfeit/:joust_id
  def forfeit
    joust_id = params[:joust_id]
    user_id = current_user.id

    joust = Participant.find(joust_id);

    if joust.owner_id != user_id && joust.opponent_id != user_id
      return head :unauthorized
    end

    winner = joust.owner_id === user_id ? joust.opponent_id : joust.owner_id

    joust.winner_id = winner
    joust.status = 'ended'
    joust.save!

    render :json => {ok: true, state: 'forfeited', data: joust}
  end

  def UpdateGameData

    data = params[:gameData]
    isInit = params[:isInitializing]
    id = params[:joustId]
    user_id = current_user.id

    participant = Participant.find(id)

    if(participant.status == 'ended')
      return render :json => {ok: false, state:'ended'}
    end

    if participant.owner_id != user_id && participant.opponent_id != user_id
      return render :json => {ok: false, status: "user_id:#{user_id} not in game"}
    end
    participant.game_data = data.to_s

    if(isInit != 'true')
      participant.waiting_for_user_id = participant.waiting_for_user_id == participant.owner_id ?
                                            participant.opponent_id : participant.owner_id
    end

    participant.save

    return render :json => {ok: true}
  end

  def isItMyTurn
    user_id = current_user.id
    id = params[:joustId]
    participant = Participant.find(id)
    op_name = ''

    if(participant.opponent_id != nil)
     op = User.find(participant.opponent_id)
      op_name = op.prenom + ' ' + op.nom
    end
    if participant != nil && participant.status != 'ended'
      if participant.waiting_for_user_id == user_id
        return render :json =>{ok: true, myTurn: true, gameData: participant.game_data, opponent_id: participant.opponent_id, opponent_name: op_name }
      else
        return render :json => {ok: true, myTurn: false}
      end

    end
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
