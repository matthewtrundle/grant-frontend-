# PaywallModal Component - Implementation Guide

## Overview

The `PaywallModal` component is an animated modal dialog for presenting premium feature upgrades with Stripe integration. It replaces or augments the full-page `PaymentGate` component with a more modern, less intrusive modal approach.

## Features

✅ **Smooth animations** using Framer Motion AnimatePresence
✅ **Backdrop blur** with fade-in effect
✅ **Modal scale & slide** entrance animation
✅ **Staggered feature list** for visual interest
✅ **Loading state** with rotating spinner during payment processing
✅ **Two pricing tiers** - Stage 3 ($199) and Stage 4 ($999)
✅ **Custom gradients** - Purple for Stage 3, Yellow-to-Purple for Stage 4
✅ **Mock payment system** using localStorage (ready for Stripe integration)

## File Structure

```
components/ui/
├── paywall-modal.tsx          # Main modal component + usePaywallModal hook
└── PAYWALL_MODAL_INTEGRATION.md  # This file

app/(dashboard)/
├── paywall-demo/page.tsx      # Demo page showcasing modal functionality
├── analyze/page.tsx           # Uses PaymentGate (can be migrated to modal)
└── generate/page.tsx          # Uses PaymentGate (can be migrated to modal)
```

## Basic Usage

### Option 1: Using the Hook (Recommended)

```tsx
"use client";

import { PaywallModal, usePaywallModal } from "@/components/ui/paywall-modal";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  const { isOpen, stage, openModal, closeModal } = usePaywallModal();

  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    // Refresh data, update UI, etc.
  };

  return (
    <div>
      <Button onClick={() => openModal("stage3")}>
        Unlock Grant Analysis
      </Button>

      <Button onClick={() => openModal("stage4")}>
        Unlock Full Application
      </Button>

      <PaywallModal
        isOpen={isOpen}
        onClose={closeModal}
        stage={stage}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
```

### Option 2: Manual State Management

```tsx
"use client";

import { useState } from "react";
import { PaywallModal } from "@/components/ui/paywall-modal";

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<"stage3" | "stage4">("stage3");

  const openStage3Modal = () => {
    setCurrentStage("stage3");
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={openStage3Modal}>Upgrade</button>

      <PaywallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stage={currentStage}
      />
    </div>
  );
}
```

## Integration with Existing Pages

### Replacing PaymentGate with Modal Approach

**Before (Full-Page Gate):**
```tsx
// app/(dashboard)/analyze/page.tsx
import { PaymentGate } from "../components/payment-gate";

export default function AnalyzePage() {
  return (
    <PaymentGate stage="stage3">
      {/* Analysis content */}
    </PaymentGate>
  );
}
```

**After (Modal Approach):**
```tsx
// app/(dashboard)/analyze/page.tsx
"use client";

import { useEffect, useState } from "react";
import { PaywallModal, usePaywallModal } from "@/components/ui/paywall-modal";

export default function AnalyzePage() {
  const [hasPaid, setHasPaid] = useState(false);
  const { isOpen, openModal, closeModal } = usePaywallModal();

  useEffect(() => {
    const paidStages = JSON.parse(localStorage.getItem("paid_stages") || "{}");
    const isPaid = paidStages.stage3 === true;
    setHasPaid(isPaid);

    // Show modal if not paid
    if (!isPaid) {
      openModal("stage3");
    }
  }, [openModal]);

  const handlePaymentSuccess = () => {
    setHasPaid(true);
  };

  if (!hasPaid) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Grant Analysis</h2>
          <p className="text-muted-foreground">
            Unlock comprehensive grant analysis to continue
          </p>
        </div>

        <PaywallModal
          isOpen={isOpen}
          onClose={closeModal}
          stage="stage3"
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Analysis content */}
    </div>
  );
}
```

## Pricing Configuration

The pricing and features are configured in `paywall-modal.tsx`:

```tsx
const PRICING = {
  stage3: {
    name: "Grant Analysis",
    tagline: "Deep insights powered by AI",
    price: 199,
    features: [
      "Comprehensive grant analysis",
      "Eligibility assessment with confidence scores",
      "Detailed budget recommendations",
      "Project timeline with milestones",
      "Risk analysis and mitigation strategies",
      "Success factor identification",
      "Personalized recommendations",
    ],
    gradient: "from-purple-600 to-purple-700",
    glowColor: "rgba(147, 51, 234, 0.5)",
  },
  stage4: {
    name: "Full Application",
    tagline: "Complete grant writing in 48 hours",
    price: 999,
    features: [
      "Complete grant application generation",
      "Multi-agent AI writing system",
      "3-round quality assessment",
      "Consistency checking across sections",
      "Technical, business, and academic scoring",
      "Downloadable application document",
      "Unlimited revisions for 30 days",
    ],
    gradient: "from-yellow-500 to-purple-600",
    glowColor: "rgba(234, 179, 8, 0.5)",
  },
};
```

## Mock Payment Flow

Currently uses localStorage for demonstration:

1. User clicks "Continue to Checkout"
2. Button shows loading spinner (1.5s delay)
3. Payment state stored: `localStorage.setItem("paid_stages", JSON.stringify({ stage3: true }))`
4. `onPaymentSuccess` callback triggered
5. Modal closes automatically

### Replacing with Real Stripe Integration

```tsx
const handleCheckout = async () => {
  setIsProcessing(true);

  try {
    // Create Stripe Checkout session
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: stage === "stage3" ? "price_stage3" : "price_stage4",
        successUrl: `${window.location.origin}/dashboard?payment=success&stage=${stage}`,
        cancelUrl: `${window.location.origin}/dashboard?payment=cancelled`,
      }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Checkout error:", error);
    setIsProcessing(false);
  }
};
```

## Animation Details

### Modal Entrance
- **Backdrop**: Opacity 0 → 1, duration 0.2s
- **Content**: Scale 0.95 → 1, Y +20 → 0, opacity 0 → 1, duration 0.3s

### Modal Exit
- **Backdrop**: Opacity 1 → 0, duration 0.2s
- **Content**: Scale 1 → 0.95, Y 0 → +20, opacity 1 → 0, duration 0.3s

### Feature List
- **Stagger**: 0.05s delay between each feature
- **Animation**: X -20 → 0, opacity 0 → 1

### Loading State
- **Spinner**: Infinite rotation, 360°, linear easing, 1s duration
- **Fade-in**: Opacity 0 → 1 on state change

## Demo Page

Visit `/paywall-demo` to see both modals in action with:
- Side-by-side cards for Stage 3 and Stage 4
- Feature lists and descriptions
- Interactive buttons to trigger modals
- Payment success indicators
- Implementation notes

## Testing Checklist

- [ ] Modal opens smoothly with backdrop blur
- [ ] Modal content scales and slides in
- [ ] Features list animates with stagger effect
- [ ] Close button works (X icon and backdrop click)
- [ ] Close button hover effect works (scale animation)
- [ ] "Continue to Checkout" button shows loading state
- [ ] Payment success callback triggered after mock payment
- [ ] Modal closes automatically after successful payment
- [ ] localStorage persists payment state
- [ ] Stage 3 shows purple gradient styling
- [ ] Stage 4 shows yellow-to-purple gradient styling
- [ ] Modal is responsive on mobile devices
- [ ] Escape key closes modal (if implemented)
- [ ] Focus trap works correctly (if implemented)

## Future Enhancements

1. **Stripe Integration** - Replace mock payment with real Stripe Checkout
2. **Email Notifications** - Send confirmation emails after payment
3. **Payment History** - Track all user payments in database
4. **Discount Codes** - Support promo codes and discounts
5. **Refund Flow** - Handle refund requests within 30 days
6. **A/B Testing** - Test different modal designs and copy
7. **Analytics** - Track conversion rates and drop-off points
8. **Accessibility** - Add keyboard navigation and screen reader support
9. **Internationalization** - Support multiple languages and currencies
10. **Trial Period** - Offer limited-time access before payment

## Troubleshooting

### Modal doesn't appear
- Ensure `isOpen` is `true`
- Check z-index conflicts (modal uses `z-50`)
- Verify Framer Motion is installed

### Animations are choppy
- Ensure GPU acceleration is enabled
- Check for CSS conflicts
- Reduce number of animated elements

### Modal closes immediately
- Check `onClose` callback isn't triggered on mount
- Verify AnimatePresence is wrapping the modal
- Check for conflicting event handlers

### Payment state not persisting
- Verify localStorage is available (not in incognito mode)
- Check browser localStorage quota
- Ensure correct key: `"paid_stages"`

## Support

For issues or questions:
- Demo Page: `/paywall-demo`
- Component: `components/ui/paywall-modal.tsx`
- Example Integration: `app/(dashboard)/paywall-demo/page.tsx`
