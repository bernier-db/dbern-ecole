class Users::RegistrationsController < Devise::RegistrationsController
   before_action :configure_sign_up_params, only: [:create]
   before_action :configure_account_update_params, only: [:update]

   def create
     build_resource
    byebug
     if resource.save
       if resource.active_for_authentication?
         set_flash_message :notice, :signed_up if is_navigational_format?
         sign_up(resource_name, resource)
         return render :json => {:success => true, :user => current_user}
       else
         set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
         expire_session_data_after_sign_in!
         return render :json => {:success => true, :user => current_user}
       end
     else
       clean_up_passwords resource
       return render :json => {:success => false}
     end
   end

   # Signs in a user on sign up. You can overwrite this method in your own
   # RegistrationsController.
   def sign_up(resource_name, resource)
     sign_in(resource_name, resource)
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
