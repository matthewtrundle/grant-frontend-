# FUNDAID Custom Font Generation

This directory contains a Python script that generates the custom FUNDAID display font based on the logo design.

## Design Specifications

The FUNDAID font features:
- **Thick monoline weight**: Consistent 120-unit stroke width
- **Rounded terminals**: 60-unit radius for soft, friendly curves
- **Geometric construction**: Based on circles and straight lines
- **Circular counters**: Perfect circles in O, D, P, Q, etc.
- **Custom cut-out details**: Signature dot cutouts in specific letters

## Prerequisites

1. **Python 3.8+** installed
2. **pip** package manager

## Installation

Install required Python packages:

```bash
cd frontend/scripts
pip install -r requirements-font.txt
```

This installs:
- `fonttools` - Font generation and manipulation
- `brotli` - WOFF2 compression support

## Usage

### Generate Font Files

Run the generation script:

```bash
python generate-fundaid-font.py
```

This will create:
- `FundAid-Display.otf` - OpenType font file
- `FundAid-Display.woff2` - Web font (compressed, recommended)

### Install Fonts

1. **Copy font files** to your public directory:
```bash
mkdir -p ../public/fonts
cp FundAid-Display.* ../public/fonts/
```

2. **Import the CSS** in your app:

In `app/layout.tsx`:
```typescript
import '@/styles/fundaid-font.css'
```

Or in your global CSS:
```css
@import url('../styles/fundaid-font.css');
```

3. **Use the font** in your components:

```typescript
<h1 className="fundaid-wordmark text-8xl">
  FUNDAID
</h1>
```

Or with gradient treatment:
```typescript
<h1 className="fundaid-wordmark-gradient text-8xl">
  FUNDAID
</h1>
```

## Current Implementation

The script currently includes glyphs for:
- **F, U, N, D, A, I** - Complete FUNDAID wordmark
- **Space character**
- **.notdef** - Default fallback glyph

### Adding More Characters

To extend the font with additional letters:

1. Open `generate-fundaid-font.py`
2. Add a new `create_glyph_X()` function following the existing pattern:

```python
def create_glyph_E(pen):
    """Create E glyph - similar to F but with bottom bar"""
    # Vertical stem
    pen.moveTo((100, 0))
    pen.lineTo((100 + STROKE_WIDTH, 0))
    # ... etc
```

3. Register the glyph in `create_glyphs()`:
```python
'E': (create_glyph_E, 600),
```

4. Add to character map in `build_font()`:
```python
0x0045: 'E',  # Letter E
```

5. Regenerate: `python generate-fundaid-font.py`

## Design Parameters

Adjust these constants in the script to modify the font style:

```python
UNITS_PER_EM = 1000      # Font size grid (standard: 1000)
STROKE_WIDTH = 120       # Main stroke thickness
TERMINAL_RADIUS = 60     # Rounded corner radius
CAP_HEIGHT = 700         # Height of capital letters
X_HEIGHT = 500           # Height of lowercase (if added)
```

## Troubleshooting

### "ModuleNotFoundError: No module named 'fontTools'"
Install dependencies: `pip install -r requirements-font.txt`

### "ModuleNotFoundError: No module named 'brotli'"
WOFF2 generation requires brotli: `pip install brotli`

### Font not loading in browser
1. Check font files are in `public/fonts/`
2. Verify CSS is imported in your app
3. Check browser console for CORS errors
4. Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Font looks wrong/pixelated
The font is vector-based and should scale perfectly. If it looks bad:
1. Check you're using the WOFF2 file (better compression)
2. Verify `font-display: swap` is in @font-face
3. Ensure letter-spacing is set (`0.08em` recommended)

## Next Steps

1. **Generate full alphabet** - Add A-Z glyphs following the FUNDAID style
2. **Add numbers** - 0-9 with consistent geometric construction
3. **Add punctuation** - Period, comma, hyphen, etc.
4. **Kerning pairs** - Fine-tune spacing between specific letter combinations
5. **Weight variants** - Create Bold, Light versions if needed

## Technical Notes

- Font uses **CFF (Compact Font Format)** for OTF files
- WOFF2 provides ~30% better compression than WOFF
- All glyphs use **cubic Bézier curves** for smooth rendering
- Font units: 1000 UPM (industry standard)
- Supports modern browsers: Chrome 36+, Firefox 39+, Safari 10+, Edge 14+

## License

Custom font for FundAid platform. All rights reserved.
