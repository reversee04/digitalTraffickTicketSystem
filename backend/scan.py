import cv2
import pytesseract
import sys
import os
import numpy as np

# Path to Tesseract OCR executable (adjust for your system)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def four_point_transform(image, pts):
    """Applies a perspective transform to align the detected number plate."""
    rect = cv2.boundingRect(pts)
    (x, y, w, h) = rect
    cropped = image[y:y+h, x:x+w]
    return cropped

def extract_number_plate_text(image_path):
    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' does not exist.", file=sys.stderr)
        return "Error: Image file not found."

    try:
        print(f"Processing image: {image_path}")
        # Load the image
        image = cv2.imread(image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)

        # Edge detection and morphological operations
        edged = cv2.Canny(gray, 50, 150)
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
        edged = cv2.dilate(edged, kernel, iterations=1)

        # Find contours
        contours, _ = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]
        print(f"Contours found: {len(contours)}")

        for contour in contours:
            approx = cv2.approxPolyDP(contour, 0.02 * cv2.arcLength(contour, True), True)
            x, y, w, h = cv2.boundingRect(approx)
            aspect_ratio = float(w) / h
            print(f"Aspect ratio: {aspect_ratio:.2f}")

            # Check for rectangular or square shapes
            if 0.8 <= aspect_ratio <= 1.2 or len(approx) == 4:
                print("Number plate contour detected.")
                warped = four_point_transform(gray, approx)
                text = pytesseract.image_to_string(warped, config='--psm 6')
                print(f"Detected text: {text.strip()}")
                if text.strip():
                    return text.strip()

        print("Warning: No rectangular or square contours detected.")
        return "Number plate not found."
    except cv2.error as e:
        print(f"OpenCV error: {e}", file=sys.stderr)
        return "Error processing image with OpenCV."
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        return "An unexpected error occurred during image processing."

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scan.py <image_path>", file=sys.stderr)
        sys.exit(1)

    image_path = sys.argv[1]
    result = extract_number_plate_text(image_path)
    print(result)
