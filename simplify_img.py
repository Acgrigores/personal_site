import os
from PIL import Image

def resize_and_optimize_images():
    # Define the target directory
    target_dir = "src"
    
    # Check if the directory exists
    if not os.path.exists(target_dir):
        print(f"Error: The directory '{target_dir}' does not exist.")
        return

    # Supported image extensions (case-insensitive)
    valid_extensions = ('.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp')
    
    # Track actions for a quick summary
    processed_count = 0
    skipped_count = 0

    print("Starting image optimization...")

    for filename in os.listdir(target_dir):
        file_path = os.path.join(target_dir, filename)
        
        # Ensure it's a file, not a subdirectory
        if not os.path.isfile(file_path):
            continue
            
        # Check if the file is an image by its extension
        if not filename.lower().endswith(valid_extensions):
            continue

        # Skip files containing "brush" or "splatter" (case-insensitive)
        lower_name = filename.lower()
        if "brush" in lower_name or "splatter" in lower_name:
            print(f"Skipping (ignored keyword): {filename}")
            skipped_count += 1
            continue

        try:
            # Open the image
            with Image.open(file_path) as img:
                # 1. Halve the dimensions (width and height)
                # We use Resampling.LANCZOS for clean downscaling
                new_size = (img.width // 2, img.height // 2)
                
                # Prevent 0-pixel width or height for tiny images
                new_size = (max(1, new_size[0]), max(1, new_size[1]))
                
                resized_img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Keep original format
                img_format = img.format
                
                # 2. Save and overwrite original file
                # If it's a JPEG or WebP, we can explicitly reduce quality to 50%
                if img_format in ['JPEG', 'MPO', 'WEBP']:
                    resized_img.save(file_path, format=img_format, quality=50)
                else:
                    # PNG/BMP don't use 'quality' the same way, but resizing 
                    # by 50% already drastically reduces file size.
                    resized_img.save(file_path, format=img_format)
                    
                print(f"Compressed & Resized: {filename} ({img.width}x{img.height} -> {new_size[0]}x{new_size[1]})")
                processed_count += 1

        except Exception as e:
            print(f"Could not process {filename}. Error: {e}")

    print(f"\nDone! Processed {processed_count} images. Skipped {skipped_count} excluded files.")

if __name__ == "__main__":
    # Highly recommended: Back up your .src folder before running this the first time!
    resize_and_optimize_images()