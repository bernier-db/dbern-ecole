Rails.application.routes.draw do


  get 'hello_world', to: 'hello_world#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #Beacause of React-router ###########
  get '/getData', to: 'main#getData'
  get '/home', to: 'main#index'
  get '/profile', to: 'main#index'
  get '/sign_in', to: 'main#index'
  get '/friends', to: 'main#index'
  #####################################

#friendships

  get '/friends/getMyFriends', to: 'friendship#FetchFriends'
  post '/friends/newFriendRequest', to: 'friendship#newFriendRequest'
  post '/friends/answerRequest', to: 'friendship#answerRequest'
  delete '/friends/delete', to: 'friendship#delete'

  #stats
  get '/stats/getMyStats', to: 'stats#getStats'
  root to: 'main#index'


  #game
  get '/games', to: 'main#index'
  get '/games/:id', to: 'game#get'
  get '/games/:id/play', to: 'game#play'
  post '/games/:joust_id/win', to: 'game#win'



end
