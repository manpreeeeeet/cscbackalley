import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";

export function Rumors() {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <div className="mx-auto">rumors /</div>
        <TypewriterEffect texts={["source? i made it up"]} />
      </div>
    </BaseLayout>
  );
}
