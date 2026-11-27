export function installReadingTools() {
  const desktop = matchMedia("(min-width: 1200px)")
  const hoverPointer = matchMedia("(hover: hover) and (pointer: fine)")
  let openTimer
  let closeTimer
  let hoveredPanel

  function positionOpenPanel() {
    if (!desktop.matches) return
    const panel = document.querySelector(".reading-tools-panel:popover-open")
    if (!panel) return
    const triggerTop = panel.previousElementSibling.getBoundingClientRect().top
    const top = Math.max(16, Math.min(triggerTop, window.innerHeight - panel.offsetHeight - 16))
    panel.style.setProperty("--reading-tools-top", `${Math.round(top)}px`)
  }

  document.addEventListener(
    "toggle",
    (event) => {
      if (event.newState === "open" && event.target.matches(".reading-tools-panel")) {
        positionOpenPanel()
      }
    },
    true,
  )
  window.addEventListener("resize", positionOpenPanel)
  document.addEventListener(
    "scroll",
    (event) => {
      if (event.target instanceof Element && event.target.matches(".reading-tools"))
        positionOpenPanel()
    },
    true,
  )

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse" || !desktop.matches || !hoverPointer.matches) return
    const dock = event.target.closest(".reading-tools")
    if (!dock) return

    clearTimeout(closeTimer)
    const trigger = event.target.closest(".reading-tools-button")
    if (!trigger || trigger.contains(event.relatedTarget)) return
    clearTimeout(openTimer)
    openTimer = setTimeout(() => {
      const panel = trigger.nextElementSibling
      if (trigger.matches(":hover") && !panel.matches(":popover-open")) {
        panel.showPopover({ source: trigger })
        hoveredPanel = panel
        positionOpenPanel()
      }
    }, 125)
  })

  document.addEventListener("pointerout", (event) => {
    if (event.pointerType !== "mouse" || !desktop.matches || !hoverPointer.matches) return
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
