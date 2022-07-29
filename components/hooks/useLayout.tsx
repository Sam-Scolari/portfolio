import { useMediaQuery } from "usehooks-ts";

export default function useLayout() {
  const mobile = useMediaQuery("(max-width: 699px)");
  const desktop = useMediaQuery("(min-width: 700px)");

  return { mobile, desktop };
}
