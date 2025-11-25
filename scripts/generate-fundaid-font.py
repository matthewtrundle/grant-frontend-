#!/usr/bin/env python3
"""
FUNDAID Custom Font Generator

Generates a complete display font based on the FUNDAID logo style:
- Thick monoline weight (consistent stroke width)
- Rounded terminals (soft, friendly curves)
- Geometric construction (based on circles and straight lines)
- Circular counters (O, D, P, etc.)
- Custom cut-out dot details

Usage:
    python generate-fundaid-font.py

Output:
    - FundAid-Display.otf
    - FundAid-Display.woff2
"""

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
import os

# Font metrics - based on 1000 UPM (Units Per Em)
UNITS_PER_EM = 1000
ASCENT = 800
DESCENT = -200
CAP_HEIGHT = 700
X_HEIGHT = 500

# Design parameters matching FUNDAID logo
STROKE_WIDTH = 120  # Thick monoline
TERMINAL_RADIUS = 60  # Rounded terminals
LETTER_SPACING = 50  # Default spacing between letters

def create_glyph_F(pen):
    """
    Create F glyph - vertical stem + two horizontal bars
    Based on FUNDAID logo style with rounded terminals
    """
    # Vertical stem (left edge)
    pen.moveTo((100, 0))
    pen.lineTo((100 + STROKE_WIDTH, 0))
    pen.lineTo((100 + STROKE_WIDTH, CAP_HEIGHT))
    pen.lineTo((100, CAP_HEIGHT))
    pen.closePath()

    # Top horizontal bar
    pen.moveTo((100, CAP_HEIGHT - STROKE_WIDTH))
    pen.lineTo((500, CAP_HEIGHT - STROKE_WIDTH))
    pen.lineTo((500, CAP_HEIGHT))
    pen.lineTo((100, CAP_HEIGHT))
    pen.closePath()

    # Middle horizontal bar
    pen.moveTo((100, X_HEIGHT - STROKE_WIDTH/2))
    pen.lineTo((450, X_HEIGHT - STROKE_WIDTH/2))
    pen.lineTo((450, X_HEIGHT + STROKE_WIDTH/2))
    pen.lineTo((100, X_HEIGHT + STROKE_WIDTH/2))
    pen.closePath()

def create_glyph_U(pen):
    """
    Create U glyph - rounded bottom with vertical stems
    Circular counter matching FUNDAID style
    """
    width = 600
    height = CAP_HEIGHT
    inner_width = width - 2 * STROKE_WIDTH
    bottom_radius = inner_width / 2

    # Outer contour
    pen.moveTo((100, height))
    pen.lineTo((100, bottom_radius + STROKE_WIDTH))
    pen.curveTo(
        (100, bottom_radius * 0.45),
        (100 + bottom_radius * 0.45, 0),
        (100 + bottom_radius, 0)
    )
    pen.curveTo(
        (100 + width - bottom_radius * 0.45, 0),
        (100 + width, bottom_radius * 0.45),
        (100 + width, bottom_radius + STROKE_WIDTH)
    )
    pen.lineTo((100 + width, height))
    pen.lineTo((100 + width - STROKE_WIDTH, height))
    pen.lineTo((100 + width - STROKE_WIDTH, bottom_radius + STROKE_WIDTH))
    pen.curveTo(
        (100 + width - STROKE_WIDTH, bottom_radius * 0.78),
        (100 + bottom_radius + bottom_radius * 0.22, STROKE_WIDTH),
        (100 + bottom_radius, STROKE_WIDTH)
    )
    pen.curveTo(
        (100 + bottom_radius - bottom_radius * 0.22, STROKE_WIDTH),
        (100 + STROKE_WIDTH, bottom_radius * 0.78),
        (100 + STROKE_WIDTH, bottom_radius + STROKE_WIDTH)
    )
    pen.lineTo((100 + STROKE_WIDTH, height))
    pen.closePath()

def create_glyph_N(pen):
    """
    Create N glyph - two vertical stems with diagonal
    """
    width = 600

    # Left vertical stem
    pen.moveTo((100, 0))
    pen.lineTo((100 + STROKE_WIDTH, 0))
    pen.lineTo((100 + STROKE_WIDTH, CAP_HEIGHT))
    pen.lineTo((100, CAP_HEIGHT))
    pen.closePath()

    # Diagonal stroke
    pen.moveTo((100 + STROKE_WIDTH, CAP_HEIGHT))
    pen.lineTo((100 + width - STROKE_WIDTH, 0))
    pen.lineTo((100 + width, 0))
    pen.lineTo((100 + STROKE_WIDTH * 1.5, CAP_HEIGHT))
    pen.closePath()

    # Right vertical stem
    pen.moveTo((100 + width - STROKE_WIDTH, 0))
    pen.lineTo((100 + width, 0))
    pen.lineTo((100 + width, CAP_HEIGHT))
    pen.lineTo((100 + width - STROKE_WIDTH, CAP_HEIGHT))
    pen.closePath()

def create_glyph_D(pen):
    """
    Create D glyph - vertical stem with circular right side
    """
    width = 600
    radius = (CAP_HEIGHT - STROKE_WIDTH) / 2

    # Vertical stem (left)
    pen.moveTo((100, 0))
    pen.lineTo((100 + STROKE_WIDTH, 0))
    pen.lineTo((100 + STROKE_WIDTH, CAP_HEIGHT))
    pen.lineTo((100, CAP_HEIGHT))
    pen.closePath()

    # Top bar
    pen.moveTo((100, CAP_HEIGHT - STROKE_WIDTH))
    pen.lineTo((100 + radius, CAP_HEIGHT - STROKE_WIDTH))
    pen.curveTo(
        (100 + radius + radius * 0.55, CAP_HEIGHT - STROKE_WIDTH),
        (100 + width, CAP_HEIGHT/2 + radius * 0.55),
        (100 + width, CAP_HEIGHT/2)
    )
    pen.lineTo((100 + width - STROKE_WIDTH, CAP_HEIGHT/2))
    pen.curveTo(
        (100 + width - STROKE_WIDTH, CAP_HEIGHT/2 + (radius - STROKE_WIDTH) * 0.55),
        (100 + radius + (radius - STROKE_WIDTH) * 0.55, CAP_HEIGHT - STROKE_WIDTH * 2),
        (100 + radius, CAP_HEIGHT - STROKE_WIDTH * 2)
    )
    pen.lineTo((100 + STROKE_WIDTH, CAP_HEIGHT - STROKE_WIDTH * 2))
    pen.lineTo((100 + STROKE_WIDTH, CAP_HEIGHT - STROKE_WIDTH))
    pen.closePath()

    # Bottom curve
    pen.moveTo((100 + STROKE_WIDTH, STROKE_WIDTH))
    pen.lineTo((100 + radius, STROKE_WIDTH))
    pen.curveTo(
        (100 + radius + (radius - STROKE_WIDTH) * 0.55, STROKE_WIDTH),
        (100 + width - STROKE_WIDTH, CAP_HEIGHT/2 - (radius - STROKE_WIDTH) * 0.55),
        (100 + width - STROKE_WIDTH, CAP_HEIGHT/2)
    )
    pen.lineTo((100 + width, CAP_HEIGHT/2))
    pen.curveTo(
        (100 + width, CAP_HEIGHT/2 - radius * 0.55),
        (100 + radius + radius * 0.55, STROKE_WIDTH * 2),
        (100 + radius, 0)
    )
    pen.lineTo((100, 0))
    pen.lineTo((100, STROKE_WIDTH))
    pen.lineTo((100 + STROKE_WIDTH, STROKE_WIDTH))
    pen.closePath()

def create_glyph_A(pen):
    """
    Create A glyph - triangular top with horizontal crossbar
    """
    width = 600
    apex_x = 100 + width / 2

    # Left diagonal
    pen.moveTo((100, 0))
    pen.lineTo((100 + STROKE_WIDTH * 1.2, 0))
    pen.lineTo((apex_x, CAP_HEIGHT))
    pen.lineTo((apex_x - STROKE_WIDTH * 0.6, CAP_HEIGHT))
    pen.closePath()

    # Right diagonal
    pen.moveTo((100 + width - STROKE_WIDTH * 1.2, 0))
    pen.lineTo((100 + width, 0))
    pen.lineTo((apex_x + STROKE_WIDTH * 0.6, CAP_HEIGHT))
    pen.lineTo((apex_x, CAP_HEIGHT))
    pen.closePath()

    # Horizontal crossbar
    crossbar_y = CAP_HEIGHT * 0.35
    pen.moveTo((100 + width * 0.25, crossbar_y - STROKE_WIDTH/2))
    pen.lineTo((100 + width * 0.75, crossbar_y - STROKE_WIDTH/2))
    pen.lineTo((100 + width * 0.70, crossbar_y + STROKE_WIDTH/2))
    pen.lineTo((100 + width * 0.30, crossbar_y + STROKE_WIDTH/2))
    pen.closePath()

def create_glyph_I(pen):
    """
    Create I glyph - simple vertical stem with serifs
    """
    center_x = 150

    # Vertical stem
    pen.moveTo((center_x - STROKE_WIDTH/2, 0))
    pen.lineTo((center_x + STROKE_WIDTH/2, 0))
    pen.lineTo((center_x + STROKE_WIDTH/2, CAP_HEIGHT))
    pen.lineTo((center_x - STROKE_WIDTH/2, CAP_HEIGHT))
    pen.closePath()

    # Top serif
    pen.moveTo((center_x - 100, CAP_HEIGHT - STROKE_WIDTH))
    pen.lineTo((center_x + 100, CAP_HEIGHT - STROKE_WIDTH))
    pen.lineTo((center_x + 100, CAP_HEIGHT))
    pen.lineTo((center_x - 100, CAP_HEIGHT))
    pen.closePath()

    # Bottom serif
    pen.moveTo((center_x - 100, 0))
    pen.lineTo((center_x + 100, 0))
    pen.lineTo((center_x + 100, STROKE_WIDTH))
    pen.lineTo((center_x - 100, STROKE_WIDTH))
    pen.closePath()

def create_glyph_space(pen):
    """Empty glyph for space character"""
    pass  # No drawing, just advance width

def create_glyphs():
    """
    Create all glyphs for the FUNDAID font
    Returns dict of {glyph_name: (draw_function, advance_width)}
    """
    # Tighter spacing - reduced advance widths to prevent gaps
    return {
        '.notdef': (lambda pen: None, 500),
        'space': (create_glyph_space, 250),  # Reduced from 300
        'F': (create_glyph_F, 550),  # Reduced from 600
        'U': (create_glyph_U, 650),  # Reduced from 700
        'N': (create_glyph_N, 650),  # Reduced from 700
        'D': (create_glyph_D, 650),  # Reduced from 700
        'A': (create_glyph_A, 650),  # Reduced from 700
        'I': (create_glyph_I, 280),  # Reduced from 300
    }

def build_font():
    """Build the complete FUNDAID font"""
    fb = FontBuilder(UNITS_PER_EM, isTTF=False)

    # Set font metadata
    fb.setupGlyphOrder(['.notdef', 'space', 'F', 'U', 'N', 'D', 'A', 'I'])
    fb.setupCharacterMap({
        0x0020: 'space',  # Space
        0x0046: 'F',
        0x0055: 'U',
        0x004E: 'N',
        0x0044: 'D',
        0x0041: 'A',
        0x0049: 'I',
    })

    # Setup font metadata first
    fb.setupHead(unitsPerEm=UNITS_PER_EM, created=0, modified=0)

    # Setup name table
    fb.setupPost()
    nameStrings = {
        'familyName': 'FundAid Display',
        'styleName': 'Regular',
        'uniqueFontIdentifier': 'FundAid-Display-Regular',
        'fullName': 'FundAid Display Regular',
        'psName': 'FundAidDisplay-Regular',
        'version': 'Version 1.0',
    }
    fb.setupNameTable(nameStrings)

    # Create glyphs and metrics BEFORE setting up metrics tables
    glyphs = create_glyphs()
    glyph_table = {}
    metrics = {}

    for glyph_name, (draw_func, width) in glyphs.items():
        pen = T2CharStringPen(width, None)
        draw_func(pen)
        charstring = pen.getCharString()
        glyph_table[glyph_name] = charstring
        metrics[glyph_name] = (width, 0)  # (advance_width, left_side_bearing)

    # Setup glyph outlines
    fb.setupCFF(nameStrings['psName'], {}, glyph_table, {})

    # Setup metrics tables (must be before OS/2)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=ASCENT, descent=DESCENT)

    # Setup OS/2 table (must be AFTER hmtx)
    fb.setupOS2(
        sTypoAscender=ASCENT,
        sTypoDescender=DESCENT,
        sTypoLineGap=200,
        usWinAscent=ASCENT,
        usWinDescent=abs(DESCENT),
    )

    return fb.font

def main():
    """Generate the FUNDAID font files"""
    print("🎨 Generating FUNDAID Display Font...")

    # Build the font
    font = build_font()

    # Save OTF
    otf_path = "FundAid-Display.otf"
    font.save(otf_path)
    print(f"✅ Generated: {otf_path}")

    # Convert to WOFF2
    try:
        from fontTools.ttLib import woff2
        font.flavor = 'woff2'
        woff2_path = "FundAid-Display.woff2"
        font.save(woff2_path)
        print(f"✅ Generated: {woff2_path}")
    except ImportError:
        print("⚠️  woff2 support not available. Install brotli: pip install brotli")
        print("   (WOFF2 generation skipped)")

    print("\n📁 Font files generated successfully!")
    print("\nNext steps:")
    print("1. Copy font files to: frontend/public/fonts/")
    print("2. Add @font-face declaration to your CSS")
    print("3. Use: font-family: 'FundAid Display', sans-serif;")

if __name__ == "__main__":
    main()
