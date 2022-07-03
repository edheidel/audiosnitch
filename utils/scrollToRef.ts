export default function scrollToRef(ref: HTMLDivElement | null, offset: number = 0): void {
  if (ref) {
    window.scrollTo({
      top: ref.offsetTop + offset,
      behavior: "smooth",
    });
  }
}
