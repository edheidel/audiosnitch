export default function scrollToRef(ref: any, offset?: number) {
  window.scrollTo({
    top: ref.offsetTop + offset,
    behavior: "smooth",
  });
}
