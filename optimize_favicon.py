import xml.etree.ElementTree as ET
import os

def resize_and_replace_favicon(file_path):
    """
    Modifies the favicon in place at the target path, ensuring a 
    perfectly square layout for Google compatibility.
    """
    if not os.path.exists(file_path):
        print(f"Error: Favicon not found at target path: '{file_path}'")
        return

    # Keep standard namespace clean
    ET.register_namespace('', 'http://www.w3.org/2000/svg')

    try:
        tree = ET.parse(file_path)
        root = tree.getroot()

        if not root.tag.endswith('svg'):
            print(f"Error: The file at '{file_path}' is not a valid SVG.")
            return

        # Read layout constraints
        viewbox = root.get('viewBox')
        
        if viewbox:
            parts = [float(x) for x in viewbox.split()]
            if len(parts) == 4:
                x, y, w, h = parts
                if w != h:
                    max_dim = max(w, h)
                    print(f"Resizing aspect ratio from {w}x{h} to square {max_dim}x{max_dim}...")
                    root.set('viewBox', f"0 0 {max_dim} {max_dim}")
                else:
                    print(f"File is already square ({w}x{h}). Re-verifying structure...")
            else:
                root.set('viewBox', '0 0 32 32')
        else:
            # Fallback if no viewBox exists
            root.set('viewBox', '0 0 32 32')

        # Google requires the vector space to scale flexibly
        root.set('width', '100%')
        root.set('height', '100%')

        # Clean metadata bloat
        for metadata in root.findall('.//{http://purl.org/dc/elements/1.1/}metadata'):
            root.remove(metadata)

        # Overwrite file
        tree.write(file_path, encoding='utf-8', xml_declaration=True)
        print(f"Success: '{file_path}' has been reformatted and replaced.")

    except Exception as e:
        print(f"Failed to process image: {e}")

if __name__ == "__main__":
    target_path = os.path.join("src", "favicon.svg")
    resize_and_replace_favicon(target_path)