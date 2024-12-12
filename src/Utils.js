export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
      let truncated = text.slice(0, maxLength - 3)
      return truncated.slice(0, truncated.lastIndexOf(' ')) + '...'
  }
  return text;
}

export function formatDate(str) {
  const date = new Date(str);
  return new Intl.DateTimeFormat('pt-BR').format(date);
}