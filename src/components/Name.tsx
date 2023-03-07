import { Show } from "solid-js";
import useTyper from "../hooks/useTyper";
import { TypePhase } from "../hooks/useTyper";
import toast, { Toaster } from "solid-toast";

export default function Name() {
  const typer = useTyper(["eth", "lens", "me", "⌐◨-◨"]);

  return (
    <>
      <Toaster position="bottom-right" />
      <h1
        onClick={() => {
          navigator.clipboard.writeText(
            "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d"
          );
          toast.success("ETH address copied to clipboard", {
            style: {
              margin: "24px",
            },
            iconTheme: {
              primary: "",
            },
          });
        }}
        class="pointer-events-auto font-bold text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-5xl max-xs:text-4xl select-none hover:scale-125 transition-transform duration-300 cursor-pointer"
      >
        samscolari.
        <span
          style={{
            "-webkit-background-clip": "text",
          }}
          class="text-transparent bg-clip-text bg-gradient-to-br from-purple via-hot-pink to-pink"
        >
          {typer.currentText()}
        </span>
        <Show when={typer.phase() !== TypePhase.Deleting}>
          <span class="animate-blink">|</span>
        </Show>
      </h1>
    </>
  );
}
