import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";

export function Projects() {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <div className="mx-auto">projects /</div>
        <TypewriterEffect texts={["i made a thing"]} />
      </div>
    </BaseLayout>
  );
}
