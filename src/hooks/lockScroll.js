// Locks page scrolling for a modal without the layout jumping: hiding the
// scrollbar widens the content, so the lost width is added back as padding.
export const lockScroll = () => {
  const scroller = document.getElementById('scroll-container')
  const target = scroller || document.body
  const scrollbarWidth = scroller
    ? scroller.offsetWidth - scroller.clientWidth
    : window.innerWidth - document.documentElement.clientWidth

  const previousOverflow = target.style.overflow
  const previousPadding = target.style.paddingRight

  if (scrollbarWidth > 0) {
    const currentPadding = parseFloat(getComputedStyle(target).paddingRight) || 0
    target.style.paddingRight = `${currentPadding + scrollbarWidth}px`
  }
  target.style.overflow = 'hidden'

  return () => {
    target.style.overflow = previousOverflow
    target.style.paddingRight = previousPadding
  }
}
