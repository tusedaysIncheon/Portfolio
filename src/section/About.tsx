import Me from '@/assets/me.png'

export default function About() {
    return (
        <section id="about" className="pt-20 pb-20 w-full h-screen flex-col scroll-mt-14 text-center">
            <div className="max-w-7xl mx-auto px-6 mt-40">
                <div>
                    <h2 className="text-4xl md:text-3xl font-bold  md:mb-30 mb-20">About Me.</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-35">
                        {/* Image */}
                        <div className="w-80 h-80 md:w-85 md:h-85 shrink-0">
                            <img src={Me} alt="Jaeman Jeon" className="rounded-full shadow-lg" />
                        </div>
                        {/* Description */}
                        <div className="text-center md:text-left mb-13">
                            <div id="description">
                                <p className="font-bold text-3xl md:text-5xl">전재만 <span className="font-bold text-lg md:text-2xl">Jaeman Jeon</span></p>
                                <p className="mt-2 text-base">Full-stack Developer | Nickname: <span className="font-bold">Zeon</span></p>
                                <div className="text-sm md:text-lg mt-4 md:mt-6 text-gray-600 dark:text-gray-300">
                                    <p className="mt-1">테크니컬 세일즈로 현장에서 사람과 기술을 연결해오며,</p>
                                    <p className="mt-1"> 문제를 이해하고 해결하는 법을 배워왔습니다.</p>
                                    <p className="mt-1">이제는 그 경험을 바탕으로, 사용자의 불편을 해결하는 </p>
                                    <p className="mt-1">개발자로 성장하고 있습니다.</p>
                                    <p className="mt-1">사람을 향한 이해와 기술에 대한 열정을 함께 품고,</p>
                                    <p className="mt-1"> 더 나은 서비스를 만들기 위해 나아가고 있습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}