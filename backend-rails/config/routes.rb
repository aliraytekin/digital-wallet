Rails.application.routes.draw do
  namespace :api do
    devise_for :users,
      controllers: {
        session: "api/sessions",
        registration: "api/registrations"
      }
    namespace :v1 do
      resources :accounts, only: %i[index show create] do
        resources :transactions, only: %i[index create]
      end
    end
  end
end
