from rembg import remove
from PIL import Image

input_path = '/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/profile/ka-vatana.jpg'
output_path = '/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/profile/ka-vatana-transparent.png'

try:
    print("Opening image...")
    input_img = Image.open(input_path)
    print("Removing background with aggressive alpha matting...")
    output_img = remove(
        input_img,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=20
    )
    print("Saving image...")
    output_img.save(output_path)
    print("Done!")
except Exception as e:
    print(f"Error: {e}")
