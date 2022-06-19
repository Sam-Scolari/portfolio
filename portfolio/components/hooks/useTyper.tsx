import { useEffect, useState } from "react";

export enum TypePhase {
  Typing,
  Pausing,
  Deleting,
}

const TYPING_INTERVAL = 200;
const PAUSE_INTERVAL = 2500;
const DELETING_INTERVAL = 100;

const useTyper = (
  texts: string[]
): { currentText: string; selectedText: string; phase: TypePhase } => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [phase, setPhase] = useState(TypePhase.Typing);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    switch (phase) {
      case TypePhase.Typing: {
        const nextText = texts[selectedIndex].slice(0, currentText.length + 1);

        if (nextText === currentText) {
          setPhase(TypePhase.Pausing);
          return;
        }

        const timeout = setTimeout(() => {
          setCurrentText(nextText);
        }, TYPING_INTERVAL);
        return () => clearTimeout(timeout);
      }

      case TypePhase.Deleting: {
        if (!currentText) {
          const nextIndex = selectedIndex + 1;
          setSelectedIndex(texts[nextIndex] ? nextIndex : 0);
          setPhase(TypePhase.Typing);
          return;
        }

        const nextRemaining = texts[selectedIndex].slice(
          0,
          currentText.length - 1
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
  }, [texts, currentText, selectedIndex, phase]);
  return { currentText, selectedText: texts[selectedIndex], phase };
};

export default useTyper;
