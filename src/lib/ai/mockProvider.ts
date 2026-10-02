// ─────────────────────────────────────────────────
// PEAT AI — Mock Enhancement Provider
// Provides realistic demo data when no API key is configured
// ─────────────────────────────────────────────────

import type {
  EnhancedPrompt,
  PromptEnhancer,
  PromptInput,
  RefinementAction,
} from "./types";

function generateId(): string {
  return `peat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const MOCK_RESPONSES: Record<string, Omit<EnhancedPrompt, "id" | "originalPrompt" | "category" | "targetLLM" | "createdAt">> = {
  "cart-animation": {
    objective:
      "Implement a visually satisfying product-to-cart animation that provides clear feedback when a user adds an item, using performant CSS transforms and spring-based physics.",
    requirements: [
      "Product thumbnail animates from its current position toward the cart icon in the navigation bar",
      "Animation uses a spring-based interpolation curve rather than standard CSS easing",
      "A ghost/clone of the product image is created for the animation to avoid disrupting page layout",
      "Cart icon shows a subtle bounce or scale pulse when the animated element arrives",
      "Cart badge count increments after animation completes",
      "Multiple rapid add-to-cart actions queue animations rather than overlapping",
    ],
    behaviour: [
      "On click: Create a clone of the product thumbnail positioned absolutely at the original element's bounding rect",
      "Phase 1 (0–450ms): Clone translates along a slight arc path toward the cart icon while scaling from 1.0 to 0.35, with a subtle Z-axis rotation of 6–10 degrees",
      "Phase 2 (450–650ms): Clone fades out with opacity 1.0 → 0 during final 200ms",
      "Phase 3 (650–850ms): Cart icon scales 1.0 → 1.15 → 1.0 with spring easing, badge updates",
      "Cleanup: Remove clone element from DOM after animation completes",
    ],
    technicalDetails: [
      "Use Web Animations API or CSS transforms — never animate width, height, top, left, or margin properties",
      "Spring physics parameters: stiffness 180, damping 12, mass 1 (adjust for desired feel)",
      "Apply will-change: transform, opacity to the animated clone element before animation starts, remove after",
      "Use getBoundingClientRect() to calculate start/end positions dynamically — do not hardcode positions",
      "Arc path: Use a CSS offset-path or interpolate with a quadratic bezier control point 60–80px above the midpoint",
      "Total animation budget: < 16ms per frame, target 60fps consistently",
    ],
    interactionDetails: [
      "Trigger: click event on 'Add to Cart' button",
      "Button should show immediate feedback (brief scale 0.95 → 1.0) before animation starts",
      "Disable button during animation to prevent double-submission (re-enable on complete)",
      "If user scrolls during animation, complete animation at last known cart position",
      "Touch devices: Use touchend event, account for 300ms tap delay if applicable",
    ],
    edgeCases: [
      "Cart icon not visible (scrolled off-screen): Animate toward top-right corner as fallback, or skip to badge update",
      "Product image fails to load: Use a placeholder shape (colored rectangle matching product card) for animation",
      "Animation interrupted by page navigation: Cancel animation, ensure cart state is still updated",
      "Reduced motion preference: Skip animation entirely, show instant badge update with no motion",
      "Very small viewport (<375px): Reduce animation complexity, shorter duration (400ms)",
    ],
    constraints: [
      "Must respect prefers-reduced-motion media query — provide instant, non-animated fallback",
      "No layout shifts during or after animation (CLS = 0 for this interaction)",
      "Works in Chrome 90+, Firefox 88+, Safari 14+, Edge 90+",
      "Animation clone must not interfere with existing z-index stacking contexts",
      "Total JS bundle for animation logic should be < 3KB gzipped",
    ],
    implementationGuidance: [
      "Consider Framer Motion's useAnimate hook for React projects — it provides spring physics out of the box",
      "For vanilla JS: Use the Web Animations API with a custom spring interpolation function",
      "Create a reusable CartAnimation component/hook that accepts source element ref and cart icon ref",
      "Use React.createPortal (or equivalent) to render the clone outside the product card's overflow:hidden container",
      "Test with Chrome DevTools Performance tab — look for Layout and Paint events during animation",
    ],
    finalPrompt:
      "Implement a 650ms product-to-cart animation triggered when the user clicks 'Add to Cart'. Create a ghost clone of the product thumbnail, positioned absolutely at the element's bounding rect. Animate the clone along a subtle arc path toward the cart icon using spring-based interpolation (stiffness: 180, damping: 12). During transit, scale the clone from 1.0 to 0.35 with a subtle Z-axis rotation of 8 degrees. Use only transform and opacity properties — no layout-triggering properties. Apply will-change: transform, opacity before animation, remove after. When the clone reaches the cart, fade it out over 200ms, then pulse the cart icon (scale 1.0 → 1.15 → 1.0 with spring easing) and increment the badge count. Queue multiple animations if the user clicks rapidly. Respect prefers-reduced-motion by skipping all animation and showing instant feedback. Ensure 60fps performance, zero CLS, and clean DOM removal of clone elements. Support Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. On viewports < 375px, use a simplified 400ms version.",
    assumptions: [
      "The cart icon is a fixed/sticky element visible in the navigation bar",
      "React-based project (guidance can be adapted for other frameworks)",
      "Product thumbnails are standard img or picture elements within a product card",
      "The cart state is managed externally — animation is purely visual",
    ],
  },
  "pricing-page": {
    objective:
      "Build a responsive pricing page with three tiered plan cards that feature entrance animations and interactive hover states, clearly guiding users toward the recommended plan.",
    requirements: [
      "Three pricing tiers displayed in a horizontal row on desktop: Starter, Pro (recommended), Enterprise",
      "Each card shows: plan name, price, billing period, feature list with check/cross icons, and CTA button",
      "Pro plan card is visually elevated — slightly larger, distinct border/accent color, 'Most Popular' badge",
      "Cards animate in on scroll with a staggered entrance (150ms delay between each card)",
      "Monthly/Annual billing toggle with price transition animation",
    ],
    behaviour: [
      "Initial load: Cards are invisible (opacity 0, translateY 30px), animate in when scrolled into viewport using IntersectionObserver",
      "Stagger: Left card first, center card 150ms later, right card 300ms later",
      "Entrance animation: 600ms duration, cubic-bezier(0.16, 1, 0.3, 1) easing",
      "Hover: Card translates Y -4px with a subtle box-shadow expansion over 200ms",
      "Billing toggle: Price numbers transition with a brief scale + fade (old price scales down while new price scales up, 300ms)",
      "CTA button: On hover, background shifts to a slightly lighter/darker shade with 150ms transition",
    ],
    technicalDetails: [
      "Use CSS Grid for card layout: grid-template-columns: repeat(3, 1fr) with gap: 24px–32px",
      "Entrance animation via IntersectionObserver with threshold: 0.15 — trigger once, then unobserve",
      "Card max-width: 380px, min-height: 500px for visual consistency",
      "Price display: Use tabular-nums font-feature for clean number alignment during transitions",
      "Feature list: Flexbox with gap: 12px, icons at 20px with consistent alignment",
      "Pro card: scale(1.05) default state relative to siblings, z-index: 1 to overlap neighboring cards slightly",
    ],
    interactionDetails: [
      "Billing toggle: Segmented control or pill-shaped toggle with smooth sliding indicator",
      "Toggle state managed locally — controls which price is displayed in all cards simultaneously",
      "CTA buttons: Distinct visual hierarchy — outline for Starter, solid filled for Pro, outline for Enterprise",
      "Keyboard: Toggle must be focusable and operable via Enter/Space, cards themselves are not interactive except the CTA",
    ],
    edgeCases: [
      "Enterprise with 'Contact Sales': Show 'Custom' as price, CTA opens a contact form or mailto link",
      "Feature list overflow: If a plan has many features, cap at 8 visible with 'See all features' expandable",
      "Annual prices showing savings: Display crossed-out monthly equivalent and percentage saved",
      "Single-plan fallback: If only one plan exists, center it and remove the comparison layout",
    ],
    constraints: [
      "Responsive breakpoints: 3 columns > 1024px, 2 columns 768–1024px (Enterprise below), single column < 768px",
      "On mobile single-column: Pro card should appear first (reorder with CSS order or source order)",
      "Animations must respect prefers-reduced-motion — instant visibility, no transforms",
      "Page should be fully functional with JavaScript disabled (animations are progressive enhancement)",
      "WCAG 2.1 AA: Sufficient color contrast on all text, focus indicators on interactive elements",
    ],
    implementationGuidance: [
      "Consider a PricingCard component with props: plan, price, features, isRecommended, billingPeriod, ctaVariant",
      "Use a pricing data structure: Array<{ name, monthlyPrice, annualPrice, features: Array<{ text, included }> }>",
      "For the billing toggle animation, use layoutId with Framer Motion or CSS transitions on a ::before pseudo-element",
      "Test with screen readers — ensure plan comparison is understandable in linear reading order",
    ],
    finalPrompt:
      "Build a pricing page with three plan cards (Starter, Pro, Enterprise) in a responsive grid. Pro card should be visually elevated with a 'Most Popular' badge and scale(1.05). Include a monthly/annual billing toggle with smooth price transition animations (300ms scale+fade). Cards should animate in on scroll using IntersectionObserver with 150ms stagger delay and 600ms ease-out entrance. On hover, cards lift 4px with shadow expansion (200ms). Layout: 3 columns > 1024px, stack on mobile with Pro first. Each card shows: plan name, price with billing period, feature list with check/cross icons, and CTA button. Use tabular-nums for price alignment. Respect prefers-reduced-motion. WCAG 2.1 AA compliance for color contrast and keyboard navigation. CTA hierarchy: outline buttons for Starter/Enterprise, solid filled for Pro.",
    assumptions: [
      "Three fixed pricing tiers (not dynamically loaded from an API)",
      "Prices are in USD with monthly and annual billing options",
      "No actual payment integration needed — CTAs link to signup flow",
      "React/Next.js project with Tailwind CSS available",
    ],
  },
  "loading-animation": {
    objective:
      "Create a polished skeleton loading animation with content-aware placeholder shapes that smoothly transition to actual content, providing a perceived performance improvement.",
    requirements: [
      "Skeleton placeholders mirror the layout of actual content (not generic loading bars)",
      "Animated shimmer effect sweeps across skeleton elements continuously",
      "Smooth crossfade transition from skeleton to actual content when data loads",
      "Skeleton shapes match content types: rectangles for text, circles for avatars, rounded rects for images",
      "Support for nested skeleton layouts (e.g., card with avatar + text + image)",
    ],
    behaviour: [
      "Mount: Skeleton renders immediately with shapes matching the target content layout",
      "Shimmer animation: Linear gradient sweeps left-to-right across all skeleton elements simultaneously, 1.5s duration, infinite loop",
      "On data ready: Skeleton fades out (opacity 1 → 0, 300ms) while actual content fades in (opacity 0 → 1, 300ms) with a 50ms overlap",
      "If data loads in < 200ms, skip skeleton entirely to avoid flash of loading state",
      "Progressive reveal: If content loads in parts, individual skeleton sections can resolve independently",
    ],
    technicalDetails: [
      "Shimmer: CSS linear-gradient at -45deg angle, background-size 200% 100%, animated with background-position",
      "Skeleton base color: neutral-200 (light) / neutral-800 (dark), shimmer highlight: neutral-300 / neutral-700",
      "Use CSS animation rather than JS for the shimmer — hardware accelerated, no main thread blocking",
      "Transition approach: Use a wrapper with position:relative, skeleton and content are position:absolute, crossfade via opacity",
      "Minimum display time: 200ms before allowing transition (prevents flicker for fast loads)",
      "Skeleton elements should use border-radius matching their content counterparts",
    ],
    interactionDetails: [
      "Non-interactive: Skeleton elements should not be focusable or clickable",
      "aria-busy='true' on the container while loading, aria-busy='false' when content is ready",
      "Screen reader: Use aria-label='Loading content' on the skeleton container",
    ],
    edgeCases: [
      "Error state: If data fails to load, transition from skeleton to an error message with retry button",
      "Very slow load (> 10s): Consider adding a subtle text hint 'Still loading...' after 5 seconds",
      "Partial content: Some data may arrive before other data — support mixed skeleton/content states",
      "Theme switching during load: Skeleton colors should reactively update if user toggles dark/light mode",
      "Empty state: If data loads successfully but is empty, show appropriate empty state — not skeleton",
    ],
    constraints: [
      "Shimmer animation must use compositor-only properties (transform, opacity) — no background-position animation in final optimization",
      "Total skeleton CSS should be < 1KB",
      "Works without JavaScript (static skeleton visible, no shimmer, content replaces on load via framework)",
      "Support dark and light themes with appropriate skeleton colors",
      "No content layout shift when transitioning from skeleton to content (identical dimensions)",
    ],
    implementationGuidance: [
      "Create a composable Skeleton component: <Skeleton variant='text|circle|rect' width height />",
      "Use a SkeletonGroup wrapper that handles the timing logic and crossfade transition",
      "Consider @keyframes shimmer { to { background-position: -200% 0 } } for the sweep effect",
      "For React: A useContentReady hook that manages the minimum display time and transition state",
      "Alternative shimmer approach: Use a pseudo-element with a gradient and translateX animation for true GPU compositing",
    ],
    finalPrompt:
      "Create a skeleton loading system with content-aware placeholder shapes that mirror actual content layout. Implement a smooth shimmer animation (1.5s linear-gradient sweep, -45deg, infinite loop) using CSS animations. Skeleton colors: neutral-200/neutral-800 base with neutral-300/neutral-700 shimmer highlight, supporting light/dark themes. When data loads, crossfade from skeleton to content over 300ms with 50ms overlap. Enforce a 200ms minimum display time to prevent loading flicker. Build composable components: <Skeleton variant='text|circle|rect' />, <SkeletonGroup /> wrapper for transition logic. Use aria-busy and aria-label for accessibility. Handle edge cases: error states with retry, slow loads with hint after 5s, partial content loading, empty states. Zero layout shift between skeleton and content (matched dimensions). Total skeleton CSS < 1KB.",
    assumptions: [
      "React-based project with component composition",
      "Content layout is known ahead of time (shapes can be predefined)",
      "Dark/light theme toggle exists in the application",
      "Data fetching is handled externally — skeleton just reacts to loading state",
    ],
  },
  "responsive-dashboard": {
    objective:
      "Transform a fixed-width dashboard layout into a fully responsive design that adapts intelligently across desktop, tablet, and mobile viewports while maintaining data readability and interaction quality.",
    requirements: [
      "Dashboard maintains full functionality across all viewport sizes (no feature hiding on mobile)",
      "Data tables transform into card-based layouts on mobile for better readability",
      "Charts resize proportionally and switch to simplified views below 480px",
      "Navigation sidebar collapses to a hamburger menu on tablet/mobile",
      "Grid-based widget layout reflows: 3–4 columns on desktop, 2 on tablet, 1 on mobile",
    ],
    behaviour: [
      "Desktop (≥1280px): Full sidebar navigation, 3–4 column widget grid, tables with all columns visible",
      "Laptop (1024–1279px): Narrow sidebar (icons only, expand on hover), 3 column grid, tables with horizontal scroll for overflow columns",
      "Tablet (768–1023px): Sidebar hidden behind hamburger toggle (slide-over overlay), 2 column grid, tables become responsive cards",
      "Mobile (<768px): Bottom tab navigation for primary sections, single column layout, cards for all data, simplified charts",
      "Transition between breakpoints should feel natural — use CSS transitions on layout changes where performant",
    ],
    technicalDetails: [
      "Use CSS Grid with grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) for the widget area",
      "Tables → Cards transformation: Use CSS display:none on table headers, reflow cells as labeled rows using data-label attributes and CSS ::before content",
      "Charts: Use ResizeObserver on chart containers, not window resize — handles layout changes from sidebar toggle too",
      "Sidebar overlay: Fixed position, left: -280px → 0 transition (300ms ease), backdrop: rgba(0,0,0,0.3)",
      "Mobile bottom nav: Fixed position, bottom: 0, height: 56px, safe-area-inset-bottom padding for notched devices",
      "Container queries where supported for truly component-level responsive behavior",
    ],
    interactionDetails: [
      "Sidebar toggle: Hamburger icon with animated transform to X (3 bars → cross), 200ms",
      "Swipe gesture support on mobile: Swipe right from left edge opens sidebar",
      "Pull-to-refresh on mobile for data refresh",
      "Tap targets on mobile: Minimum 44x44px for all interactive elements (WCAG 2.5.5)",
      "Touch-friendly dropdowns and date pickers that open as bottom sheets on mobile",
    ],
    edgeCases: [
      "Orientation change: Recalculate layout immediately, charts re-render without data flash",
      "Split-screen on iPad: Handles non-standard viewport widths gracefully",
      "Very tall tables: Virtual scrolling or pagination — never render 1000+ cards on mobile",
      "Dashboard with no data: Responsive empty states with appropriate illustration sizing",
      "Print stylesheet: Provide a clean single-column print layout for reports",
    ],
    constraints: [
      "No horizontal scrollbar on any viewport width (except within table containers, explicitly)",
      "Touch targets ≥ 44x44px on mobile and tablet",
      "Font sizes never below 14px on mobile for readability",
      "safe-area-inset support for notched devices (iPhone, etc.)",
      "Layout shifts < 0.1 CLS during responsive reflows",
      "Test on: iPhone SE (375px), iPhone 14 (390px), iPad (768px), iPad Pro (1024px), Desktop (1440px)",
    ],
    implementationGuidance: [
      "Start with mobile-first CSS — min-width breakpoints are cleaner than max-width overrides",
      "Use a DashboardLayout component that provides responsive context to child widgets",
      "Consider @container queries for widget-level responsiveness (cards that adapt based on their own width, not viewport)",
      "For table → card transformation, use a ResponsiveTable component that takes columns config and auto-generates card layout",
      "Test with Chrome DevTools device toolbar in responsive mode — use throttled CPU to catch performance issues",
    ],
    finalPrompt:
      "Make this dashboard fully responsive across desktop (≥1280px, 3-4 col grid), laptop (1024-1279px, narrow sidebar), tablet (768-1023px, hamburger menu, 2 col), and mobile (<768px, bottom nav, single col). Use CSS Grid with repeat(auto-fit, minmax(320px, 1fr)) for widget layout. Transform data tables into labeled card layouts on mobile using data-label attributes and CSS ::before. Charts should use ResizeObserver for container-aware resizing, simplifying below 480px. Sidebar: slide-over on tablet/mobile with 300ms ease transition and backdrop overlay. Bottom nav on mobile: 56px height, safe-area-inset-bottom padding. All touch targets ≥ 44px. No horizontal scrollbar at any viewport. Font minimum 14px mobile. Support orientation changes, split-screen iPad, virtual scrolling for large datasets. Mobile-first CSS approach, container queries for widget-level responsiveness. CLS < 0.1 during reflows.",
    assumptions: [
      "Existing dashboard has a sidebar navigation and grid-based widget layout",
      "Charts use a library like Recharts, Chart.js, or D3 that supports resize",
      "React-based with CSS Modules or Tailwind CSS",
      "Data tables currently render standard HTML tables",
    ],
  },
  "drag-and-drop": {
    objective:
      "Implement an accessible, performant drag-and-drop interface for reordering items in a list or between multiple lists, with visual feedback and touch support.",
    requirements: [
      "Users can drag items to reorder within a list",
      "Support dragging between multiple lists (e.g., Kanban columns)",
      "Visual drag preview follows the cursor/finger with slight opacity reduction",
      "Drop target indicators show where the item will land",
      "Keyboard-accessible: items can be reordered using keyboard shortcuts",
      "Persist order changes (call API or update local state on drop)",
    ],
    behaviour: [
      "Drag start: After 150ms hold (or immediate on mouse), lift item with scale(1.03) and box-shadow elevation, reduce opacity of original to 0.4",
      "During drag: Preview element follows cursor with 1:1 tracking, no lag. Other items shift to reveal drop gap (200ms spring transition)",
      "Drop target: A 2px accent-colored line indicator appears between items at the potential drop position",
      "Drop: Item animates to final position (300ms spring), gap closes, opacity restores. Fire onChange with new order",
      "Cancel (Escape or drop outside): Item animates back to original position (250ms ease-out)",
    ],
    technicalDetails: [
      "Use pointer events (pointerdown, pointermove, pointerup) for unified mouse/touch handling",
      "Drag preview: Clone the DOM element, append to body with position:fixed, transform: translate3d for GPU compositing",
      "Item shift: Use transform: translateY(itemHeight + gap) on items below the drag — no layout recalculation",
      "Hit testing: Calculate drop index from pointer Y position relative to list container and item heights",
      "Debounce drop index calculation to every 16ms (one frame) to prevent excessive recalculation",
      "Use requestAnimationFrame for smooth drag tracking",
    ],
    interactionDetails: [
      "Drag handle: Use a grip icon (⠿) as the drag affordance — entire row optionally draggable or just the handle",
      "Touch: 150ms hold delay to distinguish from scroll, cancel drag if user moves > 10px vertically before delay ends",
      "Mouse: Immediate drag on mousedown, set cursor to 'grabbing'",
      "Keyboard: Focus item → Space to lift → Arrow keys to move position → Space to drop → Escape to cancel",
      "Screen readers: Announce 'Item [name] lifted, position [n] of [total]' and 'Dropped at position [n]'",
    ],
    edgeCases: [
      "Empty list: Show a dashed placeholder with 'Drop items here' text",
      "Single item: Draggable but no reorder possible, prevent unnecessary state updates",
      "Rapid interactions: Debounce order changes, batch API calls",
      "Long lists: Only animate visible items — items off-screen can jump to final position",
      "Scroll during drag: Auto-scroll the container when dragging near edges (top/bottom 60px zones, 8px/frame scroll speed)",
    ],
    constraints: [
      "60fps during drag — all animations must be transform/opacity only",
      "Touch delay must not interfere with normal scrolling behavior",
      "Accessible: Full keyboard operation, ARIA live announcements, visible focus indicators",
      "Works in Chrome, Firefox, Safari, Edge (latest 2 versions)",
      "No dependency on HTML5 Drag and Drop API (inconsistent across browsers and no touch support)",
    ],
    implementationGuidance: [
      "Consider @dnd-kit/core for React — lightweight, accessible, and touch-friendly",
      "For a custom solution: Build a useDragAndDrop hook that manages drag state, preview element, and order calculation",
      "Data structure: Maintain item order as an array of IDs, compute visual positions from array index",
      "For Kanban: Use a Map<columnId, itemId[]> structure, drag handlers update both source and destination columns",
      "Optimistic updates: Update UI immediately on drop, revert if API call fails",
    ],
    finalPrompt:
      "Implement drag-and-drop reordering using pointer events (not HTML5 DnD API) for unified mouse/touch support. On drag start (150ms hold for touch, immediate for mouse), lift item with scale(1.03), elevated shadow, and 0.4 opacity original. Create a fixed-position DOM clone as drag preview, tracked via transform: translate3d for GPU compositing. Other items shift with 200ms spring transitions using translateY — no layout recalculation. Show a 2px accent-colored drop indicator line at the target position. On drop, animate to final position (300ms spring), fire onChange with new order. Support keyboard reordering: Space to lift, arrows to move, Space to drop, Escape to cancel. Include ARIA live announcements for screen readers. Auto-scroll when dragging near container edges (60px zones). Handle empty lists, single items, and rapid interactions. Target 60fps — transform/opacity animations only. Consider @dnd-kit/core for React implementation.",
    assumptions: [
      "React-based project",
      "Items have unique IDs for tracking order",
      "Order persistence is handled by the consumer (via onChange callback)",
      "List items are of consistent or known heights",
    ],
  },
  "checkout-button": {
    objective:
      "Create a checkout button with multi-phase tactile feedback that communicates processing state and success/failure through motion and haptics.",
    requirements: [
      "Button provides immediate physical-feeling feedback on click",
      "Multi-phase animation: press → processing → success/error",
      "Visual state changes are accompanied by appropriate micro-interactions",
      "Button is accessible and works with keyboard activation",
      "States are communicated through more than just color (motion + icon + text)",
    ],
    behaviour: [
      "Idle state: Button at rest with subtle breathing shadow animation (2s cycle, very subtle)",
      "Press (mousedown/touchstart): Instant scale(0.97) + slight shadow reduction, 80ms — feels like pushing a real button",
      "Release + Submit: Scale returns to 1.0, button width transitions to a circle (pill → circle morph, 400ms), text fades to a spinning loader",
      "Processing: Circular button with rotating arc border animation (1.2s per rotation). Subtle pulse opacity (0.9 → 1.0, 1s cycle)",
      "Success: Circle expands back to pill shape (300ms spring), green checkmark draws in with SVG stroke animation (500ms), text fades in: 'Complete!'",
      "Error: Button shakes horizontally (±4px, 3 cycles, 400ms), transitions to error state with X icon and 'Try Again' text",
      "Reset: After success, revert to idle after 2 seconds. Error state persists until user clicks again",
    ],
    technicalDetails: [
      "All animations use transform and opacity only — button dimensions should be set with min-width, height transitions use transform: scaleX",
      "SVG checkmark: Use stroke-dasharray and stroke-dashoffset animation for draw-in effect",
      "Spinner: CSS border with transparent segments, animated via rotate transform",
      "Pill → circle morph: Animate border-radius from 8px to 50% and width from auto to height value using transform: scaleX",
      "Haptic feedback: Use navigator.vibrate([10]) on press if available (mobile)",
      "Use CSS custom properties for timing values so they can be themed",
    ],
    interactionDetails: [
      "Click/tap triggers the submit action",
      "Keyboard: Enter or Space activates, shows same visual feedback",
      "Disabled during processing state — aria-disabled='true', visually indicated",
      "Focus ring visible on keyboard navigation, hidden on mouse click",
      "If button is inside a form, prevent default submission, handle via JavaScript",
    ],
    edgeCases: [
      "Double-click prevention: Disable immediately on first activation",
      "Network timeout: After 15s processing, transition to error state with timeout message",
      "User navigates away during processing: Cancel animation, ensure no memory leaks (cleanup on unmount)",
      "Very long button text: Ensure morph animation works regardless of text length",
      "Touch vs click: Normalize event handling, prevent ghost clicks on mobile",
    ],
    constraints: [
      "60fps throughout all animation phases",
      "Total animation JS < 2KB gzipped",
      "Works without JavaScript: Falls back to standard button behavior",
      "Color is not the only state indicator (includes icon + motion + text)",
      "Accessible: aria-live region announces state changes, button has appropriate aria-label in each state",
    ],
    implementationGuidance: [
      "Build as a self-contained CheckoutButton component with onSubmit async callback",
      "Internal state machine: idle → pressed → processing → success | error → idle",
      "Use useReducer for state management to handle complex transitions cleanly",
      "CSS Modules or styled-components with CSS custom properties for animation timings",
      "Test on low-end devices with CPU throttling to ensure 60fps target is met",
    ],
    finalPrompt:
      "Build a checkout button with multi-phase tactile animation. Idle: subtle breathing shadow (2s cycle). Press: instant scale(0.97) + shadow reduction (80ms). On submit: morph from pill to circle (400ms, animate border-radius to 50% and scaleX), text fades to spinning arc loader (1.2s rotation). Success: circle expands to pill (300ms spring), SVG checkmark draws in with stroke-dashoffset animation (500ms), text shows 'Complete!', resets after 2s. Error: horizontal shake (±4px, 3 cycles, 400ms), shows X icon and 'Try Again'. Use transform/opacity only for 60fps. Include haptic feedback via navigator.vibrate on mobile. State machine: idle → pressed → processing → success|error → idle. Disable during processing with aria-disabled. Announce state changes via aria-live. SVG draw-in for checkmark, CSS border spinner for loading. Keyboard accessible with Enter/Space activation. Double-click prevention, 15s network timeout handling.",
    assumptions: [
      "The button triggers an async operation (API call) whose success/failure drives the animation outcome",
      "React component with TypeScript",
      "The button can exist both standalone and within a form",
      "Green = success, red = error color semantics are appropriate for the design system",
    ],
  },
};

function findBestMatch(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("cart") || lower.includes("add to") || lower.includes("3d animation")) {
    return "cart-animation";
  }
  if (lower.includes("pricing") || lower.includes("plan") || lower.includes("tier")) {
    return "pricing-page";
  }
  if (lower.includes("loading") || lower.includes("skeleton") || lower.includes("spinner")) {
    return "loading-animation";
  }
  if (lower.includes("dashboard") || lower.includes("responsive") || lower.includes("mobile")) {
    return "responsive-dashboard";
  }
  if (lower.includes("drag") || lower.includes("drop") || lower.includes("reorder") || lower.includes("kanban")) {
    return "drag-and-drop";
  }
  if (lower.includes("checkout") || lower.includes("button") || lower.includes("click") || lower.includes("satisf")) {
    return "checkout-button";
  }

  // Default: return a contextually reasonable response
  const keys = Object.keys(MOCK_RESPONSES);
  return keys[Math.floor(Math.random() * keys.length)];
}

export class MockPromptEnhancer implements PromptEnhancer {
  async enhancePrompt(input: PromptInput): Promise<EnhancedPrompt> {
    // Simulate brief processing delay (realistic but not fake-long)
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const matchKey = findBestMatch(input.rawPrompt);
    const mock = MOCK_RESPONSES[matchKey];

    return {
      ...mock,
      id: generateId(),
      originalPrompt: input.rawPrompt,
      category: input.category || "frontend",
      targetLLM: input.targetLLM || "claude",
      createdAt: new Date().toISOString(),
    };
  }

  async refinePrompt(
    current: EnhancedPrompt,
    action: RefinementAction,
    _additionalInput?: string
  ): Promise<EnhancedPrompt> {
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

    // For the mock, return the same prompt with slight modifications based on action
    const refined = { ...current, id: generateId(), createdAt: new Date().toISOString() };

    switch (action) {
      case "more-technical":
        refined.finalPrompt = current.finalPrompt + "\n\nAdditional technical detail: Use CSS containment (contain: layout style paint) on animated containers to isolate rendering. Implement a compositor-driven animation pipeline using will-change hints and layer promotion via translateZ(0). Consider using the Houdini Animation Worklet API where supported for frame-perfect spring physics on the compositor thread.";
        refined.technicalDetails = [
          ...current.technicalDetails,
          "Apply CSS containment (contain: layout style paint) on animated containers",
          "Use compositor-driven animations via will-change and translateZ(0) layer promotion",
          "Consider Houdini Animation Worklet API for thread-offloaded spring physics",
        ];
        break;
      case "more-concise":
        refined.finalPrompt = current.finalPrompt.split(". ").slice(0, Math.ceil(current.finalPrompt.split(". ").length * 0.6)).join(". ") + ".";
        refined.requirements = current.requirements.slice(0, Math.max(3, Math.ceil(current.requirements.length * 0.6)));
        refined.edgeCases = current.edgeCases.slice(0, 2);
        break;
      case "add-constraints":
        refined.constraints = [
          ...current.constraints,
          "Must work in private/incognito browsing mode",
          "Total feature bundle size < 15KB gzipped",
          "First meaningful paint < 1.5s on 3G connection",
          "WCAG 2.1 Level AA compliance required",
        ];
        refined.finalPrompt = current.finalPrompt + " Additional constraints: Bundle size < 15KB gzipped, FMP < 1.5s on 3G, WCAG 2.1 AA compliance, must work in private/incognito mode.";
        break;
      case "regenerate":
        // Return with slightly shuffled content
        refined.requirements = [...current.requirements].reverse();
        break;
      default:
        break;
    }

    return refined;
  }
}
