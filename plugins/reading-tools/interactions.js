export function installReadingTools() {
  const desktopHover = matchMedia("(min-width: 1200px) and (hover: hover) and (pointer: fine)")
  let openTimer
  let closeTimer
  let hoveredPanel

  function selectType(button) {
    if (button.getAttribute("aria-pressed") === "true") return
    const previous = button.parentElement.querySelector('[aria-pressed="true"]')
    const previousItems = document.getElementById(previous.getAttribute("aria-controls"))
    const nextItems = document.getElementById(button.getAttribute("aria-controls"))
    if (previousItems.contains(document.activeElement)) button.focus({ preventScroll: true })
    previous.setAttribute("aria-pressed", "false")
    button.setAttribute("aria-pressed", "true")
    previousItems.hidden = true
    nextItems.hidden = false
    nextItems.parentElement.scrollTop = 0
  }

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse" || !desktopHover.matches) return
    const dock = event.target.closest(".reading-tools")
    if (!dock) return

    clearTimeout(closeTimer)
    const type = event.target.closest(".reading-tools-type")
    if (type) selectType(type)

    const trigger = event.target.closest(".reading-tools-button")
    if (!trigger || trigger.contains(event.relatedTarget)) return
    clearTimeout(openTimer)
    openTimer = setTimeout(() => {
      const panel = trigger.nextElementSibling
      if (trigger.matches(":hover") && !panel.matches(":popover-open")) {
        panel.showPopover({ source: trigger })
        hoveredPanel = panel
      }
    }, 125)
  })

  document.addEventListener("pointerout", (event) => {
    if (event.pointerType !== "mouse" || !desktopHover.matches) return
    const dock = event.target.closest(".reading-tools")
    if (!dock) return

    const trigger = event.target.closest(".reading-tools-button")
    if (trigger && !trigger.contains(event.relatedTarget)) clearTimeout(openTimer)
    if (!dock.contains(event.relatedTarget) && hoveredPanel?.matches(":popover-open")) {
      const panel = hoveredPanel
      closeTimer = setTimeout(() => {
        if (hoveredPanel === panel) {
          panel.hidePopover()
          hoveredPanel = null
        }
      }, 260)
    }
  })

  document.addEventListener("click", (event) => {
    const type = event.target.closest(".reading-tools-type")
    if (type) selectType(type)

    const trigger = event.target.closest(".reading-tools-button")
    if (!trigger) return
    clearTimeout(openTimer)
    clearTimeout(closeTimer)
    if (hoveredPanel === trigger.nextElementSibling && hoveredPanel.matches(":popover-open")) {
      event.preventDefault()
    }
    hoveredPanel = null
  })

  document.addEventListener("prenav", () => {
    clearTimeout(openTimer)
    clearTimeout(closeTimer)
    document.querySelector(".reading-tools-panel:popover-open")?.hidePopover()
    hoveredPanel = null
  })
}
