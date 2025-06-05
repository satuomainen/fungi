FROM php:8.1.32-apache-bookworm

RUN apt update && apt upgrade -y && apt install nano

# Enable rewrite mode in Apache, that allows using the .htaccess in tests
RUN a2enmod rewrite

# Enable setting headers in .htaccess
RUN a2enmod headers