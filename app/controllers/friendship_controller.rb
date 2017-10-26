class FriendshipController < ApplicationController
  before_action :authenticate_user

  before_action :filter_new_request_params, only: [:newFriendRequest]
  before_action :filter_answer_request_params, only: [:answerRequest]
  before_action :filter_delete_params, only: [:delete]

#/friends/getMyFriends
  def FetchFriends

    user_id = current_user.id

    @AcceptedFriends = User.allFriends(user_id)
    @PendingRecRequests = User.PendingRecRequests(user_id)
    #@PendingSendRequests = User.PendingSendRequests(user_id)

    render :json => {
        ok:true,
        friends: @AcceptedFriends,
        requests: @PendingRecRequests #,
        #PendingSendRequests: @PendingSendRequests
    }
  end


#post '/friends/newFriendRequest'
  def newFriendRequest

    email = params[:email]
    friend_id = User.where("email = (?)", email).first.id
    user_id = current_user.id


    if (user_id == friend_id)
      render :json => {ok:false, msg: 'Impossible, it\'s you!'}
      return
    end

    if (Relationship.friendExist?(user_id, friend_id))
      render :json => {ok:false, msg:'You are already friends!'}
      return
    end


    @rel = Relationship.new(user_id: user_id,
                            friend_id: friend_id,
                            status: 'waiting')
    if (@rel.save)
      render :json => {ok:true, msg: 'Request sent!'}
      return
    else
      render :json => {ok: false, msg:'An error occured'}
    end
  end


#post '/friends/answerRequest'
  def answerRequest
    id = params[:id]
    answer = params[:answer]

    rel = Relationship.find(id)
    if rel === nil
      render :json => {ok:false, msg: 'Request not found'}
      return
    end
    if rel.user_id != current_user.id && rel.friend_id != current_user.id
      return head :unauthoried
    end

    status = answer == "true" ? 'accepted' : 'rejected'

    if rel.status != 'waiting'
      render :json => {ok:false, msg: 'Request already answered'}
      return
    end


    rel.status = status
    rel.save

    render :json => {ok:true, msg: "Friend request #{status}"}
  end

  def delete
    id = params[:id]
    rel = Relationship.find(id)
    if rel != nil &.destroy
    render :json => {ok:true, state: 'deleted'}
    else
    render :json =>{ok: false}
    end
  end


  private

  def filter_new_request_params
    params.require(:email)
    params.permit(:email)
  end

  def filter_answer_request_params
    params.require(:id)
    params.require(:answer)
    params.permit(:id, :answer);
  end

  def filter_delete_params
    params.require(:id)
    params.permit(:id)
  end
end
