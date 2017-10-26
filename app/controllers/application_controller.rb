class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
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
end
