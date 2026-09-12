export function scrollToId(id: string) {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
