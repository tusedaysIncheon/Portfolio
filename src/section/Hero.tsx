import Keyboard from "@/assets/keyboard.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-x-hidden min-h-screen scroll-mt-16 pt-56 md:pt-64 lg:pt-72 pb-24"
    >
      <img
        src={Keyboard}
        alt="keyboard background"
        className="pointer-events-none absolute w-[600px] sm:w-[800px] md:w-[1000px] lg:w-[1400px] max-w-none opacity-12 rotate-[-26deg] left-1/2 -translate-x-1/2 top-48 sm:top-52 md:top-60 lg:top-68 z-0"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl">Hi There👋</div>
        <div className="flex-col text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-5">
          저는 꿈꾸는 Full-Stack Developer
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2">
          전재만<span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"> 입니다.</span>
        </div>
        <div className="mt-10 text-lg sm:text-xl md:text-2xl">
          작은 움직임으로 큰 가치를 만드는 개발자
        </div>
        <div className="mt-2 text-lg sm:text-xl md:text-2xl">
          키보드만 있으면 무엇이든 할 수 있습니다.
        </div>
      </div>
    </section>
  );
}
