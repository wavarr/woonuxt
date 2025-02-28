#!/bin/bash

# Create required directories
mkdir -p woonuxt_base/public/images/categories
mkdir -p woonuxt_base/public/images/products
mkdir -p woonuxt_base/public/images/avatars

# Create placeholder category images
for category in home books electronics clothing; do
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#f0f0f0"/><text x="400" y="300" font-family="Arial" font-size="42" text-anchor="middle" fill="#333">'$category' Category</text></svg>' > "woonuxt_base/public/images/categories/$category.jpg"
done

# Create placeholder product images
for product in headphones backpack; do
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f5f5f5"/><text x="400" y="400" font-family="Arial" font-size="42" text-anchor="middle" fill="#333">'$product' Product</text></svg>' > "woonuxt_base/public/images/products/$product.jpg"
done

# Create placeholder avatar images
for i in {1..5}; do
  echo '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#e3e3e3" stroke="#ccc" stroke-width="2"/><circle cx="100" cy="80" r="40" fill="#bbb"/><circle cx="100" cy="160" r="60" fill="#bbb"/><text x="100" y="110" font-family="Arial" font-size="24" text-anchor="middle" fill="#555">Avatar '$i'</text></svg>' > "woonuxt_base/public/images/avatars/avatar-$i.png"
done

echo "All placeholder images created successfully!" 
