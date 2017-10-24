class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  def create
    if User.find_by_email(params[:email]) != nil
      return render :json => {success: false, msg: 'Email already registered'}
    end

    @user = User.new(:email => params[:email],
                     :password => params[:password],
                     :password_confirmation => params[:password_confirmation],
                      :nom => params[:nom],
                      :prenom => params[:prenom])

    if @user.save
      then
        sign_in(@user)
        signed = user_signed_in?
       render :json => {success: true, user: @user, isLogged: signed}
    else
      clean_up_passwords @user
      render :json => {success: false, msg: 'An error happened'}
    end
  end


  private

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params

    devise_parameter_sanitizer.permit(:sign_up, keys: [:prenom, :nom, :email, :password, :password_confirmation])
  end

  # If you have extra params to permit, append them to the sanitizer.
  #  def configure_account_update_params
  #
  #    devise_parameter_sanitizer.permit(:user)
  #  end

  # The path used after sign up.
  #  def after_sign_up_path_for(resource)
  #   super(resource)
  #  end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
