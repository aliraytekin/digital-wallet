class Transaction < ApplicationRecord
  belongs_to :sender_account, class_name: "Account"
  belongs_to :receiver_account, class_name: "Account"

  enum status: { pending: 0, completed: 1, failed: -1, flagged: -2 }

  validates :amount, numericality: { greater_than_or_equal_to: 0 }
  validate :enough_balance, on: :create

  after_create :process_transaction
  after_create_commit :check_for_fraud

  private

  def enough_balance
    return unless sender_account

    errors.add(:amount, "Sender does not have enough money") if amount > sender_account.balance
  end

  def process_transaction
    ActiveRecord::Base.transaction do
      sender_account.update!(balance: sender_account.balance - amount)
      receiver_account.update!(balance: receiver_account.balance + amount)
      completed!
    end
  rescue StandardError
    failed!
  end

  def check_for_fraud
    result = FraudCheckService.check(self)
    if result["suspicious"]
      update!(suspicious: true, status: :flagged)
    else
      update!(status: :completed)
    end
  end
end
