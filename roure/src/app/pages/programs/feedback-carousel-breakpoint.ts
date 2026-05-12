/** Keep aligned with testimonial carousel CSS `@media (max-width: …)` where arrows hide. */
export const PROGRAM_FEEDBACK_COMPACT_BREAKPOINT_MAX_PX = 768;

export const PROGRAM_FEEDBACK_COMPACT_MEDIA = `(max-width: ${PROGRAM_FEEDBACK_COMPACT_BREAKPOINT_MAX_PX}px)`;

export function programFeedbackItemsPerPage(layoutCompact: boolean): number {
  return layoutCompact ? 1 : 2;
}

export function programFeedbackPageCount(testimonialCount: number, layoutCompact: boolean): number {
  const perPage = programFeedbackItemsPerPage(layoutCompact);
  return Math.max(1, Math.ceil(testimonialCount / perPage));
}

/** Preserve the first visible testimonial when crossing the desktop/mobile breakpoint. */
export function remapFeedbackPageIndex(
  currentPageIndex: number,
  wasCompact: boolean,
  nowCompact: boolean,
  testimonialCount: number
): number {
  if (wasCompact === nowCompact) return currentPageIndex;
  const prevPer = programFeedbackItemsPerPage(wasCompact);
  const nextPer = programFeedbackItemsPerPage(nowCompact);
  const firstItemIndex = currentPageIndex * prevPer;
  const newPageCount = programFeedbackPageCount(testimonialCount, nowCompact);
  return Math.min(Math.floor(firstItemIndex / nextPer), newPageCount - 1);
}
