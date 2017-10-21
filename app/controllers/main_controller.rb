class MainController < ApplicationController

  def index

  render 'home/index.html.erb'
  end

  def getData
    @latest = Game.latest(5)
    @popular = Game.mostPopular(5)
    @current = Game.currentlyPlayed(5)
    render :json => {latest: @latest, popular: @popular, current: @current}
  end
end
