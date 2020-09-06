Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      resources :users
      resources :rooms
      resources :chats
      resources :user_tags
      resources :room_tags
      resources :room_users
      resources :tags
      resources :hello
      resources :relationships, only: [:create, :destroy]
      post "login" => "session#create"
      delete "logout" => "session#destroy"
      
    end
  end
end
