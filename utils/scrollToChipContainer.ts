import refs from "store/refs";
import scrollToRef from "./scrollToRef";

export default function scrollToChipContainer() {
  setTimeout(() => scrollToRef(refs.chipContainerRef, -60), 500);
}
