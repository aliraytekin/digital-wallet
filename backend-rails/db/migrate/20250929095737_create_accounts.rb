class CreateAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :account_type
      t.decimal :balance, precision: 12, scale: 2
      t.string :currency, default: "EUR"

      t.timestamps
    end
  end
end
