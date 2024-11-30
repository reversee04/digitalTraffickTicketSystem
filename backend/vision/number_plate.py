import cv2
import easyocr
import sys

# EasyOCR Reader initialization (only once)
reader = easyocr.Reader(['en'], gpu=True)

def extract_text_from_image(image_path):
    # Load image
    img = cv2.imread(image_path)

    if img is None:
        return "Error: Could not load image."

    # Convert to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Load Haar Cascade for detecting number plates
    harcascade = "model/haarcascade_russian_plate_number.xml"
    plate_cascade = cv2.CascadeClassifier(harcascade)
    
    plates = plate_cascade.detectMultiScale(img_gray, 1.2, 6)
    # plates = plate_cascade.detectMultiScale(img_gray, scaleFactor=1.5, minNeighbors=5, minSize=(100, 50), maxSize=(400, 200))

    detected_text = ""

    # Process each detected plate
    for (x, y, w, h) in plates:
        area = w * h
        if area > 500:  # Minimum area threshold to filter small detections
            img_roi = img[y:y + h, x:x + w]
            result = reader.readtext(img_roi, detail=0, paragraph=False)  # `detail=0` for text only
            if result:
                detected_text = result[0]
                break
    
    return detected_text if detected_text else "No text detected"

# Main script execution
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No image path provided.")
        sys.exit(1)
    
    image_path = sys.argv[1]
    text = extract_text_from_image(image_path)
    print(text)  # This will be captured in Node.js as the output
