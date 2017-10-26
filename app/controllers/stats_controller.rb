class StatsController < ApplicationController
  before_action :authenticate_user!

  # get '/stats/getMyStats'
  def getStats
    stats = Participant.getStats(current_user)
    render :json => {ok: true, stats: stats}
  end


end
