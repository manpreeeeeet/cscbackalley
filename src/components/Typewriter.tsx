import { useEffect, useState } from "react";

export function TypewriterEffect({ texts }: { texts: string[] }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  const typingSpeed = 50;
  const eraseSpeed = 20;
  const delayBetweenTexts = 2000;

  useEffect(() => {
    const currentString = texts[currentIndex % texts.length];

    if (!isErasing) {
      if (currentText.length < currentString.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentString.substring(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsErasing(true);
        }, delayBetweenTexts);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, eraseSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsErasing(false);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, [currentText, isErasing, currentIndex, texts]);

  return (
    <div className="text-base pt-2">
      <span>{currentText}</span>
      <span className="font-bold border-l-4 ml-1 border-white"></span>
    </div>
  );
}
