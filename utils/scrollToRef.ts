export default function scrollToRef(ref: HTMLElement | null, offset: number = 0): void {
  if (ref) {
    window.scrollTo({
      top: ref.offsetTop + offset,
      behavior: "smooth",
    });
  }
}
