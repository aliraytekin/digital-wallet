class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable and :omniauthable

  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :registerable, :recoverable, :rememberable, :validatable,
         :database_authenticatable, :jwt_authenticatable,
         jwt_revocation_strategy: self

  has_many :accounts, dependent: :destroy
  has_many :transactions, through: :accounts
end
