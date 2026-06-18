import cv2
import numpy as np

img = cv2.imread('/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/profile/ka-vatana.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold to get mask (assuming white background is > 240)
_, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

# Clean up mask
kernel = np.ones((5,5), np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

# Blur for smooth edges
mask = cv2.GaussianBlur(mask, (5,5), 0)

b, g, r = cv2.split(img)
rgba = [b, g, r, mask]
dst = cv2.merge(rgba, 4)

cv2.imwrite('/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/profile/ka-vatana-transparent.png', dst)
print("Saved transparent image")
