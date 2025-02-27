#!/bin/bash

# Create a directory for the output if it doesn't exist
mkdir -p ./app/output

# Output file
OUTPUT_FILE="./app/combined_components.txt"

# Start with a fresh file
echo "# Combined Vue Components and Configuration Files" > $OUTPUT_FILE
echo "# Generated on $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# First add configuration files (GQL fragments are considered configuration)
echo "## Configuration Files" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Add GQL fragments first as they're important for data structure
for file in ./app/queries/fragments/*.gql; do
  if [ -f "$file" ]; then
    echo "### $(basename $file)" >> $OUTPUT_FILE
    echo '```graphql' >> $OUTPUT_FILE
    cat "$file" >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
  fi
done

# Add components by category in order of importance
declare -a COMPONENT_DIRS=(
  "./app/components/generalElements"  # General elements first as they're foundational
  "./app/components/productElements"  # Product elements next as they're core to e-commerce
  "./app/components/shopElements"     # Shop elements for the shopping experience
  "./app/components/cartElements"     # Cart functionality
  "./app/components/forms"            # Forms for user interaction
  "./app/components/filtering"        # Filtering components
  "./app/components/debug"            # Debug components last as they're auxiliary
)

# Add pages after components
declare -a PAGE_DIRS=(
  "./app/pages/product"
  "./app/pages/product-category"
  "./app/pages/my-account"
  "./app/pages/checkout"
  "./app/pages/products"
)

# Process components by category
for dir in "${COMPONENT_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    category=$(basename "$dir")
    echo "## $category Components" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    for file in "$dir"/*.vue; do
      if [ -f "$file" ]; then
        echo "### $(basename $file)" >> $OUTPUT_FILE
        echo '```vue' >> $OUTPUT_FILE
        cat "$file" >> $OUTPUT_FILE
        echo '```' >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
      fi
    done
  fi
done

# Process pages
echo "## Pages" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

for dir in "${PAGE_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    category=$(basename "$dir")
    echo "### $category Pages" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    for file in "$dir"/*.vue; do
      if [ -f "$file" ]; then
        echo "#### $(basename $file)" >> $OUTPUT_FILE
        echo '```vue' >> $OUTPUT_FILE
        cat "$file" >> $OUTPUT_FILE
        echo '```' >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
      fi
    done
  fi
done

echo "Combined components and configuration files have been saved to $OUTPUT_FILE".
