FROM registry.baota.io/nginx:1.13

# Copy Nginx Setting
COPY nginx.conf /etc/nginx/nginx.conf

# Copy APP Files
COPY dist/ /data/app
