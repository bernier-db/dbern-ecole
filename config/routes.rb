Rails.application.routes.draw do

  root to: 'main#index'

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords'
  }

  post '/users/sign_in', to: 'users/sessions#create'
  delete '/users/sign_out', to: 'users/sessions#destroy'
  delete '/users/sign_out', to: 'users/sessions#destroy'
  # patch '/users/password', to: 'users/passwords#update'
  # put '/users/password', to: 'users/passwords#update'


  get '/auth/is_signed_in', to: 'main#is_signed_in'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #Because of React-router ############
  get '/getData', to: 'main#getData' #(home page data)
  get '/home', to: 'main#index'
  get '/profile', to: 'main#index'
  get '/sign_in', to: 'main#index'
  get '/friends', to: 'main#index'
  get '/games', to: 'main#index'
  #####################################

  #friendships
  get '/friends/getMyFriends', to: 'friendship#FetchFriends'
  post '/friends/newFriendRequest', to: 'friendship#newFriendRequest'
  post '/friends/answerRequest', to: 'friendship#answerRequest'
  delete '/friends/delete', to: 'friendship#delete'

  #users
  get '/users/getUserInfo/:id', to: 'main#getUserInfo'

  #stats
  get '/stats/getMyStats', to: 'stats#getStats'

  #game
  get '/games/getAllGames', to: 'game#getAllgames'
  get '/games/:id', to: 'game#get'
  get '/games/:id/play', to: 'game#play'
  post '/games/:joust_id/win', to: 'game#win'


end
