export function formatExcerpt(content: string, maxLength = 180): string {
  if (!content) return ''
  // On retire les balises HTML éventuelles
  let text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  if (text.length > maxLength) {
    const cut = text.slice(0, maxLength)
    text = cut.slice(0, cut.lastIndexOf(' ')) + '…'
  }
  return text
} 