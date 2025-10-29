# ProgressTracker Component - Implementation Guide

## Overview

The `ProgressTracker` component provides real-time progress tracking for long-running operations (like Stage 4 grant application generation) using Server-Sent Events (SSE). It features smooth animations, phase visualization, reconnection logic, and a confetti celebration on completion.

## Features

✅ **Real-time SSE updates** - Connects to backend via EventSource API
✅ **Smooth progress animations** - No jumps, gradual transitions
✅ **5-phase visualization** - Analyzing, Retrieving, Generating, Assessing, Finalizing
✅ **Step-by-step updates** - Current operation with fade transitions
✅ **ETA display** - Estimated time remaining
✅ **Automatic reconnection** - Exponential backoff (5 attempts)
✅ **Error handling** - Graceful error display and recovery
✅ **Completion celebration** - Confetti animation when done
✅ **Mock mode** - Testing without backend (`MockProgressTracker`)

## Installation

### Dependencies

```bash
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
```

Already installed in this project.

## Component Files

```
components/ui/
├── progress-tracker.tsx              # Main component + Mock version
├── progress.tsx                      # Base progress bar (Radix UI)
└── PROGRESS_TRACKER_INTEGRATION.md  # This file

app/(dashboard)/
└── progress-demo/page.tsx           # Demo/test page
```

## Basic Usage

### Option 1: Real SSE Connection

```tsx
"use client";

import { ProgressTracker } from "@/components/ui/progress-tracker";
import { useAuth } from "@clerk/nextjs";

export default function GeneratePage() {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const applicationId = "app-123"; // From your API

  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  const handleComplete = (data) => {
    console.log("Generation complete!", data);
    // Redirect to results page or update UI
  };

  const handleError = (error) => {
    console.error("Generation failed:", error);
    // Show error message or retry option
  };

  return (
    <div>
      <ProgressTracker
        applicationId={applicationId}
        token={token}
        sseEndpoint="/api/v1/stage4/progress"
        onComplete={handleComplete}
        onError={handleError}
        autoStart={true}
      />
    </div>
  );
}
```

### Option 2: Mock Progress (for testing/demo)

```tsx
"use client";

import { MockProgressTracker } from "@/components/ui/progress-tracker";

export default function TestPage() {
  return (
    <MockProgressTracker
      onComplete={() => console.log("Mock generation complete!")}
      duration={30000} // 30 seconds
    />
  );
}
```

## Props

### ProgressTracker Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `applicationId` | `string` | ✅ | - | Unique ID for the generation task |
| `token` | `string` | ✅ | - | Authentication token |
| `sseEndpoint` | `string` | ❌ | `/api/v1/stage4/progress` | SSE endpoint URL |
| `onComplete` | `(data: ProgressUpdate) => void` | ❌ | - | Called when generation completes |
| `onError` | `(error: string) => void` | ❌ | - | Called on error |
| `autoStart` | `boolean` | ❌ | `true` | Auto-connect on mount |

### MockProgressTracker Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onComplete` | `() => void` | ❌ | - | Called when mock completes |
| `duration` | `number` | ❌ | `30000` | Duration in milliseconds |

## Backend Integration

### SSE Endpoint Requirements

The backend SSE endpoint should:
1. Accept GET request: `GET /api/v1/stage4/progress/{applicationId}?token={token}`
2. Return `text/event-stream` content type
3. Send progress updates as JSON events

### Event Data Format

```typescript
interface ProgressUpdate {
  progress: number;        // 0-100
  step: string;           // Current operation description
  phase: string;          // Phase name (matches PROGRESS_PHASES)
  eta?: number;           // Estimated seconds remaining
  status: "running" | "completed" | "error";
  error?: string;         // Error message if status = "error"
}
```

### Example Backend (FastAPI)

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio
import json

app = FastAPI()

async def generate_progress(application_id: str):
    """Simulate progress updates"""
    steps = [
        {"progress": 10, "step": "Analyzing RFP...", "phase": "Analyzing RFP", "eta": 180},
        {"progress": 25, "step": "Retrieving examples...", "phase": "Retrieving Examples", "eta": 150},
        {"progress": 50, "step": "Generating sections...", "phase": "Generating Sections", "eta": 100},
        {"progress": 80, "step": "Running assessors...", "phase": "Running Assessors", "eta": 40},
        {"progress": 95, "step": "Finalizing...", "phase": "Finalizing", "eta": 10},
        {"progress": 100, "step": "Complete!", "phase": "Finalizing", "status": "completed"},
    ]

    for step in steps:
        update = {
            "progress": step["progress"],
            "step": step["step"],
            "phase": step["phase"],
            "eta": step.get("eta"),
            "status": step.get("status", "running"),
        }
        yield f"data: {json.dumps(update)}\n\n"
        await asyncio.sleep(2)  # Simulate work

@app.get("/api/v1/stage4/progress/{application_id}")
async def progress_stream(application_id: str, token: str):
    # Verify token and application_id
    # ...

    return StreamingResponse(
        generate_progress(application_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
        }
    )
```

## Progress Phases

The component visualizes 5 distinct phases:

### Phase 1: Analyzing RFP (0-20%)
- **Icon**: Search
- **Color**: Blue
- **Operations**: Parsing requirements, identifying criteria

### Phase 2: Retrieving Examples (20-40%)
- **Icon**: FileText
- **Color**: Purple
- **Operations**: RAG queries, fetching similar applications

### Phase 3: Generating Sections (40-75%)
- **Icon**: Wand2
- **Color**: Yellow
- **Operations**: Multi-agent writing, section generation

### Phase 4: Running Assessors (75-95%)
- **Icon**: Target
- **Color**: Green
- **Operations**: Technical/business/academic scoring

### Phase 5: Finalizing (95-100%)
- **Icon**: Sparkles
- **Color**: Pink
- **Operations**: Consistency checking, document compilation

## Animations

### Progress Bar
- Smooth transition via Radix UI Progress component
- Updates every 500ms to prevent jumps
- Never reaches 100% until server confirms completion

### Current Step
- Fade-out old step (opacity 1 → 0, Y 0 → 10)
- Fade-in new step (opacity 0 → 1, Y -10 → 0)
- Duration: 300ms

### Phase Indicator
- Scale animation on phase change (0.95 → 1)
- Background color transitions automatically

### Completion Confetti
- Multi-burst pattern (5 bursts)
- Varying spread angles (26° to 120°)
- Different velocities and particle counts
- Total: ~200 particles

## Reconnection Logic

The component automatically reconnects on connection loss:

1. **Attempt 1**: Reconnect after 1 second
2. **Attempt 2**: Reconnect after 2 seconds
3. **Attempt 3**: Reconnect after 4 seconds
4. **Attempt 4**: Reconnect after 8 seconds
5. **Attempt 5**: Reconnect after 10 seconds (max)
6. **After 5 failures**: Show error, stop reconnecting

Formula: `delay = min(1000 * 2^attempts, 10000)`

## Error Handling

### Connection Errors
- Automatically attempt reconnection
- Show "Reconnecting..." indicator with attempt count
- After 5 failures, display error alert

### Backend Errors
- Parse error from SSE event data
- Display in destructive Alert component
- Call `onError` callback
- Stop connection

### Network Issues
- EventSource automatically handles some network issues
- Manual reconnection for persistent problems

## Integration with /generate Page

Replace the existing simple progress indicator:

**Before:**
```tsx
// app/(dashboard)/generate/page.tsx
<div className="flex items-center gap-3">
  <Loader2 className="h-6 w-6 animate-spin text-primary" />
  <span className="text-lg font-medium">{progress}% Complete</span>
</div>
<Progress value={progress} className="h-2" />
```

**After:**
```tsx
// app/(dashboard)/generate/page.tsx
import { ProgressTracker } from "@/components/ui/progress-tracker";

// In component:
const [applicationId, setApplicationId] = useState<string | null>(null);

useEffect(() => {
  // Trigger generation API, get application ID
  startGeneration().then(({ id }) => setApplicationId(id));
}, []);

return (
  <div>
    {applicationId && (
      <ProgressTracker
        applicationId={applicationId}
        token={token}
        onComplete={(data) => {
          setApplication(data);
          toast({ title: "Application ready!" });
        }}
        onError={(error) => {
          toast({ title: "Generation failed", description: error, variant: "destructive" });
        }}
      />
    )}
  </div>
);
```

## Demo Page

Visit `/progress-demo` to test the component:
- Mock 30-second generation with all phases
- Real-time step updates
- Smooth progress animations
- Confetti celebration
- Implementation examples and documentation

## Testing Checklist

- [ ] SSE connection establishes successfully
- [ ] Progress updates smoothly (no jumps)
- [ ] Current step fades in/out correctly
- [ ] Phase indicators update with correct colors
- [ ] ETA displays and updates
- [ ] Reconnection works after connection loss
- [ ] Confetti triggers on completion
- [ ] Error messages display correctly
- [ ] onComplete callback fires with data
- [ ] onError callback fires on failures
- [ ] Component cleans up on unmount (closes connection)
- [ ] Works on mobile devices
- [ ] Accessible (screen reader friendly)

## Troubleshooting

### Connection fails immediately
- Check SSE endpoint URL is correct
- Verify token is valid and not expired
- Ensure CORS headers allow EventSource connections
- Check backend is sending correct content-type

### Progress doesn't update
- Verify backend is sending events in correct format
- Check browser console for parsing errors
- Ensure events have `data: ` prefix
- Confirm JSON structure matches ProgressUpdate interface

### Confetti doesn't appear
- Check canvas-confetti is installed
- Verify no CSS `overflow: hidden` on parents
- Check z-index conflicts (confetti uses 9999)

### Reconnection loops forever
- Backend may be accepting but not sending events
- Check for infinite reconnect loop in console
- Verify backend closes connection on completion

## Performance Considerations

- **SSE vs WebSocket**: SSE is simpler for one-way server-to-client updates
- **Memory**: EventSource auto-manages connection, no memory leaks
- **Battery**: Minimal impact, events are server-pushed not polled
- **Network**: ~100 bytes per event, negligible bandwidth

## Future Enhancements

1. **Pause/Resume** - Allow user to pause generation
2. **Cancel Operation** - Add cancel button with confirmation
3. **History Replay** - Show past generation attempts
4. **Detailed Logs** - Expandable section with step-by-step logs
5. **Sound Effects** - Optional audio feedback on completion
6. **Dark Mode** - Adapt colors for dark theme
7. **Mobile Optimization** - Simplified view for small screens
8. **Accessibility** - ARIA live regions for screen readers
9. **Analytics** - Track completion rates and average durations
10. **Custom Phases** - Allow configurable phase definitions

## Support

For issues or questions:
- Demo Page: `/progress-demo`
- Component: `components/ui/progress-tracker.tsx`
- Example: `app/(dashboard)/progress-demo/page.tsx`
