import os
from PIL import Image

def resize_and_optimize_images():
    # Adjusted to match your "src" folder shown in VS Code
    target_dir = "src"
    
    if not os.path.exists(target_dir):
        print(f"Error: The directory '{target_dir}' does not exist.")
        return

    valid_extensions = ('.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp')
    qualifying_files = []

    # Step 1: Collect all qualifying images and their file sizes
    for filename in os.listdir(target_dir):
        file_path = os.path.join(target_dir, filename)
        
        if not os.path.isfile(file_path):
            continue
            
        if not filename.lower().endswith(valid_extensions):
            continue

        lower_name = filename.lower()
        if "brush" in lower_name or "splatter" in lower_name:
            continue
            
        # Store file path and its size in bytes
        file_size = os.path.getsize(file_path)
        qualifying_files.append((file_path, filename, file_size))

    if not qualifying_files:
        print("No qualifying images found in the directory.")
        return

    # Step 2: Calculate the 75th percentile threshold by file size
    # Sorting from smallest to largest
    qualifying_files.sort(key=lambda x: x[2])
    
    # Calculate index corresponding to the 75th percentile (top 25% largest)
    total_images = len(qualifying_files)
    percentile_index = int(total_images * 0.75)
    
    # Get the file size threshold
    threshold_size = qualifying_files[percentile_index][2]
    
    print(f"Total qualifying images: {total_images}")
    print(f"75th percentile threshold size: {threshold_size / 1024:.2f} KB\n")

    processed_count = 0
    skipped_count = 0

    # Step 3: Process only files equal to or larger than the threshold size
    for file_path, filename, file_size in qualifying_files:
        if file_size < threshold_size:
            skipped_count += 1
            continue

        try:
            with Image.open(file_path) as img:
                # 1. Halve the dimensions
                new_size = (img.width // 2, img.height // 2)
                new_size = (max(1, new_size[0]), max(1, new_size[1]))
                
                resized_img = img.resize(new_size, Image.Resampling.LANCZOS)
                img_format = img.format
                
                # 2. Overwrite and reduce quality (if applicable)
                if img_format in ['JPEG', 'MPO', 'WEBP']:
                    resized_img.save(file_path, format=img_format, quality=50)
                else:
                    resized_img.save(file_path, format=img_format)
                    
                print(f"Compressed (Top 25%): {filename} ({file_size / 1024:.2f} KB) -> {new_size[0]}x{new_size[1]}")
                processed_count += 1

        except Exception as e:
            print(f"Could not process {filename}. Error: {e}")

    print(f"\nDone! Compressed {processed_count} large images. Kept {skipped_count} smaller images untouched.")

if __name__ == "__main__":
    resize_and_optimize_images()