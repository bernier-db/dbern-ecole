class MainController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :getUserInfo_params, only: [:getUserInfo]

  def index
    render 'home/index.html.erb'
  end

  def getData
    @latest = Game.latest(3)
    @popular = Game.mostPopular(3)
    @current = Game.currentlyPlayed(5)
    render :json => {latest: @latest, popular: @popular, current: @current}
  end

  def is_signed_in
    if user_signed_in?
    then
      render :json => {"signed_in" => true, "user" => current_user}
    else
      render :json => {"signed_in" => false}
    end
  end

  def hasGames
    if (user_signed_in?)
      user_id = current_user.id
      game = Participant.isPlaying(user_id, nil)
      render :json => {ok: true, game: game}
      return
    end
    render :json =>{ok: true, game: nil}
  end


  #/users/getUserInfo/:id
  def getUserInfo
    user_id = params[:user_id]

    user = User.find(user_id)
    if user === nil
      render :json => {ok: false, msg: 'User not found'}
      return
    end
    stats = Participant.getStats(user)

    render :json => {ok: true, user: user, stats: stats}
  end


  private

  def getUserInfo_params
    params.require(:user_id)
    params.permit(:user_id)
  end

end
