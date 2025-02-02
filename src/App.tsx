import frog from "./content/frog.webp";

import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";

function App() {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <img src={frog} alt="" />
        <div className="mx-auto">cscbackalley.club</div>
        <TypewriterEffect
          texts={[
            "please meet me at back alley of csc",
            "csc back alley isn't real it cannot hurt you",
            "best place on campus",
          ]}
        />
      </div>
    </BaseLayout>
  );
}

export default App;
