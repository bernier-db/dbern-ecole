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

  def update

    account_update_params = devise_parameter_sanitizer.sanitize(:update_user)

    # required for settings form to submit when password is left blank
    if account_update_params[:password].blank?
      account_update_params.delete("password")
      account_update_params.delete("password_confirmation")
    end

    @user = User.find(current_user.id)

    @update = update_resource(@user, account_update_params)

    if @update
      # Sign in the user bypassing validation in case their password changed
      bypass_sign_in(@user)
      render :json=>{ok: true, user: current_user, msg: "Info updated!"}
    else
      render :json=>{ok:false, msg: 'Error updating'}
    end
  end


  private

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params

    devise_parameter_sanitizer.permit(:sign_up, keys: [:prenom, :nom, :email, :password, :password_confirmation])
  end

  # If you have extra params to permit, append them to the sanitizer.
   def configure_account_update_params

     devise_parameter_sanitizer.permit(:update_user, keys:[:email, :password, :password_confirmation, :current_password, :prenom, :nom])
   end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end
  # The path used after sign up.
  #  def after_sign_up_path_for(resource)
  #   super(resource)
  #  end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
