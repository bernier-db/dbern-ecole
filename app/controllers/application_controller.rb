class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :goBackTogameIfnotOver
  # before_action :configure_permitted_parameters, if: :devise_controller?
  #
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.for(:sign_up) << :name
  #   devise_parameter_sanitizer.for(:sign_up) << :provider
  #   devise_parameter_sanitizer.for(:sign_up) << :uid
  # end

  def authenticate_user
    if not user_signed_in?
      redirect_to "/sign_in"
    end
  end

  # get '/home', to: 'main#index'
  # get '/profile', to: 'main#index'
  # get '/sign_in', to: 'main#index'
  # get '/friends', to: 'main#index'
  # get '/games', to: 'main#index'
  # get '/games/infos/:id', to: 'main#index'
  # get '/games/play/:id', to: 'main#index'
  def goBackTogameIfnotOver
    urlArray = ['/', '/home', '/profile', '/sign_in', '/friends', '/games', '/games/info']

    if user_signed_in? && !request.path.include?("/games/play/") && urlArray.include?(request.path)
      joust = Participant.isPlaying(current_user.id, nil)
      if joust!= nil
        return redirect_to "/games/play/#{joust.game_id}"
      end
    end
  end

end
