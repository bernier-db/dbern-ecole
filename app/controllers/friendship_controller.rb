class FriendshipController < ApplicationController
  before_action :authenticate_user!

before_action :filter_new_request_params, only: [:newFriendRequest]
before_action :filter_answer_request_params, only: [:answerRequest]
before_action :filter_delete_params, only: [:delete]

#/friends/getMyFriends
def FetchFriends
    user_id = current_user.id

    @AcceptedFriends = User.allFriends(user_id)
    @PendingRecRequests = User.PendingRecRequests(user_id)
    @PendingSendRequests = User.PendingSendRequests(user_id)

    render :json => {
        AcceptedFriends: @AcceptedFriends,
        PendingRecRequests: @PendingRecRequests,
        PendingSendRequests: @PendingSendRequests}
  end


#NEW
  def newFriendRequest

    email = params[:email]
    friend_id = User.where("email = (?)", email).first.id
    user_id = current_user.id


    if (user_id == friend_id)
      render :json => {state: 'same person'}
      return
    end

    if(Relationship.friendExist?(user_id, friend_id) )
      render :json => {state: 'exists'}
      return
    end


    @rel = Relationship.new(user_id: user_id,
          friend_id: friend_id,
          status: 'waiting')
    if(@rel.save)
      render :json => {state: 'sent'}
      return
    else
      render :json => {state: 'error'}
    end
  end



#Answer Request
  def answerRequest
    id = params[:id]
    answer = params[:answer]

    if (answer != "0" && answer != '1')
      render :json=>{state: 'wrong type of answer'}
      return
    end

    rel = Relationship.find(id)
    if(rel.user_id != current_user.id && rel.friend_id != current_user.id)
      return head :unauthoried
    end


    status = answer == 0 ? 'rejected' : 'accepted'

    if(rel.status != 'waiting')
      render :json => {state: 'Relationshhip not pending'}
      return
    end


    rel.status = status
    rel.save

    render :json => {state: "request #{status}" }
  end

  def delete
    id = params[:id]

    Relationship.find(id).destroy

    render :json => {state: 'deleted'}

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
