class StatsController < ApplicationController
  before_action :authenticate_user!

  def getStats
    stats = Participant.getStats(current_user)
    puts stats

    render :json => {games: stats}
  end


end
