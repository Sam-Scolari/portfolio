import { Accessor, createEffect, createSignal } from "solid-js";

export enum TypePhase {
  Typing,
  Pausing,
  Deleting,
}

// export const Phases = {
//   typing: 0,
//   pausing: 1,
//   deleting: 2,
// } as const;

const TYPING_INTERVAL = 200;
const PAUSE_INTERVAL = 2500;
const DELETING_INTERVAL = 100;

export default function useTyper(texts: string[]): {
  currentText: Accessor<string>;
  selectedText: string;
  phase: Accessor<TypePhase>;
} {
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [phase, setPhase] = createSignal(TypePhase.Typing);
  const [currentText, setCurrentText] = createSignal("");

  createEffect(() => {
    switch (phase()) {
      case TypePhase.Typing: {
        const nextText = texts[selectedIndex()].slice(
          0,
          currentText().length + 1
        );

        if (nextText === currentText()) {
          setPhase(TypePhase.Pausing);
          return;
        }

        const timeout = setTimeout(() => {
          setCurrentText(nextText);
        }, TYPING_INTERVAL);
        return () => clearTimeout(timeout);
      }

      case TypePhase.Deleting: {
        if (!currentText()) {
          const nextIndex = selectedIndex() + 1;
          setSelectedIndex(texts[nextIndex] ? nextIndex : 0);
          setPhase(TypePhase.Typing);
          return;
        }

        const nextRemaining = texts[selectedIndex()].slice(
          0,
          currentText().length - 1
        );

        const timeout = setTimeout(() => {
          setCurrentText(nextRemaining);
        }, DELETING_INTERVAL);
        return () => clearTimeout(timeout);
      }

      case TypePhase.Pausing:
      default:
        const timeout = setTimeout(() => {
          setPhase(TypePhase.Deleting);
        }, PAUSE_INTERVAL);
        return () => clearTimeout(timeout);
    }
  });
  return {
    currentText: currentText,
    selectedText: texts[selectedIndex()],
    phase: phase,
  };
}
