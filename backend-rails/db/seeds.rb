require 'faker'

puts "Delete database..."

User.destroy_all

puts "Creating users"

users = []

20.times do
  user = User.create!(
    email: Faker::Internet.email,
    password: "123456"
  )

  users << user
end


puts "Users created"

users.each do |user|
  rand(2..3).times do
    Account.create!(
      user: users.sample,
      account_type: Account::TYPES.sample,
      balance: rand(45..32100),
      currency: Account::CURRENCIES.sample,
    )
  end
end

puts "Accounts created"

accounts = Account.all

accounts.each do |account|
  rand(15..51).times do
    amount = rand(50...1000)

    if amount <= account.balance
      Transaction.create(
        sender_account: accounts.sample,
        receiver_account: accounts.sample,
        amount: amount,
        status: :completed,
        suspicious: false,
        description: ["Dinner payout", "Family support", "Charity donation", "Gift to a friend", "Financial support"].sample,
      )
    end
  end
end

puts "Seeding complete"
puts "#{User.count} users created"
puts "#{Account.count} accounts for users created"
puts "#{Transaction.count} transactions created"
