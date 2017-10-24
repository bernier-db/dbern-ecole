class Users::SessionsController < Devise::SessionsController

   before_action :configure_sign_in_params, only: [:create]
    # before_action :protect_against_forgery, :except => :destroy
  #GET /users/sign_in
   def new
     super
    end

  # POST /resource/sign_in
   def create
     resource = User.find_by_email(params[:email])
     if resource == nil || resource ==[]
     then
       render :json => {ok: false, msg: 'Invalid email or password'}
       return
     end
      if resource.valid_password?(params[:password])
      then
        sign_in :user, resource
       return render :json => {ok: true, msg:"Welcome #{resource.nom}!",user: resource}
     end

     render :json => {ok: false, msg: 'Invalid email or password'}
   end

  # DELETE '/users/sign_out'
   def destroy
     # super

     sign_out current_user

   end


  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys:[:email, :password, :remember_me])
  end

end
