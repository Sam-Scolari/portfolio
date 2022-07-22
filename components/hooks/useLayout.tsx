import { useMediaQuery } from "usehooks-ts";

export default function useLayout() {
  const desktop = useMediaQuery("(min-width: 700px)");

  return { desktop };
}
