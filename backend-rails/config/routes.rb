Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: "api/sessions",
    registrations: "api/registrations"
  }
  namespace :api do
    namespace :v1 do
      resources :accounts, only: %i[index show create] do
        resources :transactions, only: %i[index create]
      end
    end
  end
end
