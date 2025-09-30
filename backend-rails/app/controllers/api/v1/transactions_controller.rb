class Api::V1::TransactionsController < Api::V1::BaseController
  def show
    account = current_user.accounts.find(params[:id])

    transactions = Transaction.where(sender_account: account).or(Transaction.where(receiver_account: account))

    render json: transactions
  end

  def create
    sender = current_user.accounts.find(transaction_params[:sender_account_id])
    receiver = Account.find_by!(account_number: transaction_params[:receiver_account_number])

    transaction = Transaction.new(
      sender_account: sender,
      receiver_account: receiver,
      amount: transaction_params[:amount],
      description: transaction_params[:description],
    )

    if transaction.save
      render json: transaction, status: :created
    else
      render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:amount, :description, :sender_account_id, :receiver_account_number)
  end
end
