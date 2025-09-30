require 'httpparty'

class FraudCheckService
  include HTTParty
  base_uri ENV.fetch("FRAUD_SERVICE_ERL", "http://localhost:8000")

  def self.check(transaction)
    response = post("/check_transaction",
      headers: { 'Content-Type' => 'application/json' },
      body: {
        amount: transaction.amount,
        sender_id: transaction.sender_account_id,
        receiver_id: transaction.receiver_account_id,
      }.to_json
    )

    JSON.parse(response.body)
  rescue => e
    Rails.logger.error("FraudCheckService failed: #{e.message}")
    { "suspicious" => false, "reason" => "Service unavailable" }
  end
end
