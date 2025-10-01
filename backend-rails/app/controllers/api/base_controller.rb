class Api::BaseController < ActionController::API
  before_action :authenticate_api_user!
end
