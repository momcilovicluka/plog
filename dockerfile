# Dockerfile
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    git \
    unzip \
    curl \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Set working directory
WORKDIR /var/www

# Copy existing application directory
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Laravel dependencies
RUN composer install --no-interaction

# Install React (Inertia) dependencies
RUN npm install

# Build the React application
RUN npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Run migrations and seeders
RUN php artisan migrate:reset && php artisan migrate --force && php artisan db:seed --force

# Expose port
EXPOSE 8000

# Start the Laravel application
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
