import { useEffect } from 'react'

const NbspCleaner = ({ children }) => {
  useEffect(() => {
    const cleanNbsp = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.includes('\u00A0')) {
          node.textContent = node.textContent.replace(/\u00A0/g, ' ')
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(cleanNbsp)
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            cleanNbsp(node)
          }
        })
      })
    })

    // Очистить текущее
    cleanNbsp(document.body)
    
    // Следить за новым
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return children
}

export default NbspCleaner