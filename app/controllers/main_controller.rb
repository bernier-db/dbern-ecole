class MainController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :getUserInfo_params, only: :getUserInfo
  def index
  render 'home/index.html.erb'
  end

  def getData
    @latest = Game.latest(5)
    @popular = Game.mostPopular(5)
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


  #/users/getUserInfo/:id
  def getUserInfo
    user_id = params[:user_id]

    user = User.find(user_id)
    if user === nil
      render :json => {ok:false, msg:'User not found'}
      return
    end
    stats = Participant.getStats(user)

    render :json => {ok:true, user:user, stats: stats}
  end


  private

  def getUserInfo_params
    params.require(:user_id)
    params.permit(:user_id)
  end

end
