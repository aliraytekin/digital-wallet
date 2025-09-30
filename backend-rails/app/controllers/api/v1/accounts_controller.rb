class Api::V1::AccountsController < Api::V1::BaseController
  def index
    accounts = current_user.accounts
    render json: accounts
  end

  def show
    account = current_user.accounts.find(params[:id])

    render json: account
  end

  def create
    account = current_user.accounts.build(account_params)

    if account.save
      render json: account, status: :created
    else
      render json: { errors: account.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.require(:account).permit(:account_type, :balance, :currency)
  end
end
