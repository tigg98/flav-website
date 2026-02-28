from PIL import Image

def crop_white_borders(image_path, output_path):
    img = Image.open(image_path).convert("RGB")
    width, height = img.size
    
    # We want to find the maximum inscribed rectangle that avoids white corners.
    # Actually, a simpler approach is to crop symmetrically by a certain percentage.
    # Let's find the first row and column from the middle that hits white on the edge.
    # Wait, the prompt says "zoom just enough to cut off any white space on the border."
    # Let's just find the inscribed square. Since the icon is likely a square with rounded corners on a white bg.
    # We check the diagonal from the corner (0,0) towards the center until the pixel is no longer "white".
    # A pixel is white if r>240 and g>240 and b>240.
    
    pixels = img.load()
    
    def is_white(c):
        return c[0] > 240 and c[1] > 240 and c[2] > 240

    crop_amount = 0
    # Let's just check the top-left corner diagonal
    for i in range(min(width, height) // 2):
        if is_white(pixels[i, i]) or is_white(pixels[width-1-i, i]) or is_white(pixels[i, height-1-i]) or is_white(pixels[width-1-i, height-1-i]):
            crop_amount = i
        else:
            break
            
    # Add a tiny bit of buffer just to be sure
    crop_amount += 2
    
    # If crop_amount is huge, maybe the logic is wrong, but let's see.
    print(f"Original size: {width}x{height}")
    print(f"Cropping {crop_amount} pixels from all sides")
    
    cropped = img.crop((crop_amount, crop_amount, width - crop_amount, height - crop_amount))
    print(f"New size: {cropped.size}")
    
    # We should resize back to 1024x1024 or whatever the standard is, or just keep it square.
    cropped = cropped.resize((1024, 1024), Image.LANCZOS)
    cropped.save(output_path, "PNG")

crop_white_borders("/Users/TigerDeStefano/.gemini/antigravity/brain/d25a4f4d-bf6e-4de1-8d7e-ec4422bdb3e0/media__1772253516679.jpg", "public/logo.png")
