export default function scrollToRef(ref: any, offset?: number) {
  window.scrollTo({
    top: ref.current.offsetTop + offset,
    behavior: "smooth",
  });
}
