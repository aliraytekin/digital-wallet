Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :accounts, only: %i[index show create] do
        resources :transactions, only: %i[show create]
      end
    end
  end
end
