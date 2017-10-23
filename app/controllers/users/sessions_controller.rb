class Users::SessionsController < Devise::SessionsController

   before_action :configure_sign_in_params, only: [:create]

  #GET /users/sign_in
   def new
     super
    end

  # POST /resource/sign_in
   def create
     resource = User.find_by_email(params[:user][:email])
     if resource == nil
     then
       render :json => {state: 'invalid email'}
       return
     end
      if resource.valid_password?(params[:user][:password])
      then
        sign_in :user, resource
       return render :json => {user: :user}
     end

      render :json =>{state: 'invalid'}
   end

  # DELETE '/users/sign_out'
  #  def destroy
  #    super
  #  end


  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, user: [:email, :password, :remember_me])
  end
end
