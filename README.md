# Digital Wallet & Fraud Detection Demo

## Overview

This project demonstrates how Ruby on Rails, Python (FastAPI), and React + TypeScript can be combined to build a secure (JWT token), scalable, and intelligent digital banking platform.

It simulates a digital wallet system where users can:

- Create accounts
- Transfer funds
- Track transactions
- Detect fraudulent activity using basic anomaly detection

# Tech Stack
## Backend (Core API)

- Ruby on Rails
- RESTful JSON API for users, accounts, and transactions
- PostgreSQL for relational data
- RSpec for testing
- JWT authentication for security

## Fraud Detection Microservice

- Python (FastAPI)
- Simple anomaly detection based on transaction amount patterns
- Communicates with the Rails API via HTTP
- Will be extended with ML models (Isolation Forest, etc.)

## Frontend

- React + TypeScript
- Dashboard with account balances and transactions
- Real-time fraud alerts
- Modular, component-based structure
- Clean CSS (no UI frameworks for full control)
