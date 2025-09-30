class Api::RegistrationsController < Devise::RegistrationsController
  respond_to :json


  def create
    user = User.new(sign_up_params)
    if user.save
      render json: { message: 'Signed up successfully', user: user }, status: :ok
    else
      render json: { message: 'Sign up failed', errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
