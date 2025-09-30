class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.references :sender_account, null: false, foreign_key: { to_table: :accounts }
      t.references :receiver_account, null: false, foreign_key: { to_table: :accounts }
      t.decimal :amount, precision: 12, scale: 2, null: false
      t.integer :status, default: 0
      t.boolean :suspicious, default: false
      t.string :description

      t.timestamps
    end
  end
end
