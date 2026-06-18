from rembg import remove
from PIL import Image

input_path = '/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/profile/ka-vatana.jpg'
output_path = '/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/profile/ka-vatana-transparent.png'

print("Opening image...")
input_img = Image.open(input_path)
print("Removing background...")
output_img = remove(input_img)
print("Saving image...")
output_img.save(output_path)
print("Done!")
