export default function About() {
    return (
        <section id="about" className="pt-20 pb-20 w-full h-screen flex-col scroll-mt-14 text-center">
            <div className="max-w-7xl mx-auto px-6 border-2">
                <div >
                    <div className="items-center justify-center text-5xl font-bold">About Me.</div>
                    <div className="flex">
                        <div className="border-2 w-100 h-100 pointer-events-none justify-between m-15 rounded-full">img</div>
                        <div className="border-2 w-170 h-120 mt-7 ml-10 p-15">
                            <div id="description" className="text-left flex-col">
                                <p className="font-bold text-5xl">전재만 <span className="font-bold text-2xl">Jaeman Jeon</span></p>
                                <p className="mt-2 ml-1 flex">Full-stack Developer | Nickname: <p className="font-bold ml-1">Zeon</p></p>
                                <div className="text-xl mt-8">
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