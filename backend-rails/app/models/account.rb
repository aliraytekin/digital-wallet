class Account < ApplicationRecord
  belongs_to :user
  has_many :sent_transactions, class_name: "Transaction", foreign_key: "sender_account_id", dependent: :destroy
  has_many :received_transactions, class_name: "Transaction", foreign_key: "receiver_account_id", dependent: :destroy

  TYPES = ["Checking", "Savings", "Deposit", "Money Market"]
  CURRENCIES = ["EUR", "USD", "CAD", "AUD"]
  validates :account_type, inclusion: { in: TYPES }
  validates :currency, inclusion: { in: CURRENCIES }
  validates :account_number, presence: true, uniqueness: true

  before_validation :generate_account_number, on: :create

  private

  def generate_account_number
    self.account_number ||= SecureRandom.random_number(10**10).to_s.rjust(10, "0")
  end
end
