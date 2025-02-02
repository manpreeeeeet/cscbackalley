import frog from "./content/frog.webp";

function App() {
  return (
    <div className="bg-black text-white font-serif  min-h-screen">
      <div className="w-full border-b flex py-1">
        <div>
          <a href="/">cscbackalley.club</a>
        </div>
        <div></div>
      </div>
      <div className="text-4xl mt-20 lg:max-w-screen-md mx-auto">
        <div className="flex flex-col items-center">
          <img src={frog} alt="" />
          <div className="mx-auto">cscbackalley.club</div>
          <div className="text-base pt-4">
            "please meet me at back alley of csc"
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
