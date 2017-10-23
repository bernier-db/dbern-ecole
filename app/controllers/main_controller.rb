class MainController < ApplicationController
  skip_before_action :verify_authenticity_token

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


end
