FROM ruby:3.3.9

# Install dependencies for Rails + PostgreSQL
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  curl

# Create app directory
WORKDIR /app

# Copy Gemfiles first for caching
COPY Gemfile Gemfile.lock ./

# Install bundler and gems
RUN gem install bundler && bundle install

# Copy rest of the app
COPY . .

# Expose Rails port
EXPOSE 4000

# Default command (Compose overrides this)
CMD ["bash"]
