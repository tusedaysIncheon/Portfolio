import { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ pdfjs worker (CDN)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Project = {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  tags: string[];
  pdfs: string[];
};

const PROJECTS: Project[] = [
  {
    id: "trendlens",
    title: "TrendLens",
    oneLiner: "AI 체형 분석 → 3D Mesh → 치수 측정 → 트렌드 패션 추천",
    description:
      "전신 이미지와 신체정보를 입력받아 3D Mesh 생성 및 스케일링 후 치수를 측정하고, 추천 API(JSON) 결과를 렌더링하는 웹서비스.",
    tags: ["React","Vite","TS","SpringBoot","FastAPI","AWS","K8s","S3","Docker","Gemini API"],
    pdfs: [
      "/pdfs/trendlens/trendlens.pdf",
    ],
  },
  {
    id: "pulse",
    title: "Pulse",
    oneLiner: "러닝 크루 커뮤니티 / 실시간 기능 중심",
    description:
      "크루 커뮤니티 기능과 실시간 흐름을 중심으로 설계/구현한 프로젝트. \n크루 관련 도메인을 맡았으며 SSE를 이용한 실시간 크루 단체채팅을 구현했습니다.",
    tags: ["JSP", "Spring Legacy", "Oracle", "Tomcat", "Realtime", "SSE"],
    pdfs: ["/pdfs/pulse/pulse.pdf"],
  },
  {
    id: "AllDayRun",
    title: "AllDayRun",
    oneLiner: "러닝 크루 커뮤니티",
    description:
      "크루 커뮤니티 기능과 실시간 흐름을 중심으로 설계/구현한 프로젝트. \nCRUD 기반으로 크루 도메인 관련 기능을 풀스택으로 개발 하였습니다.",
    tags: ["JSP", "Servlet", "Oracle", "Tomcat"],
    pdfs: ["/pdfs/alldayrun/alldayrun.pdf"],
  },
    {
    id: "Hetel Console Project",
    title: "Hetel Console Project",
    oneLiner: "호텔 예약 서비스",
    description:
      "콘솔 기판 파일 입출력 프로그램. \n회원가입,로그인,로그아웃 관련 도메인을 맡아서 개발하였습니다.",
    tags: ["Java", "TXT"],
    pdfs: ["/pdfs/hotel/hotelconsoleproject.pdf"],
  },
];

// ✅ Vite base 경로 대응 (배포 시 서브경로여도 안전)
function resolvePublicUrl(p: string) {
  return `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
}

function PdfDeckCarousel({ pdfUrls }: { pdfUrls: string[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  // 데스크탑: 높이 기준 / 모바일: 폭 기준
  const [pageHeight, setPageHeight] = useState<number | undefined>(undefined);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);

  const [pdfIndex, setPdfIndex] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  // ✅ 스와이프(모바일) 좌표
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // ✅ 모바일 감지
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mql.matches);
    apply();

    if (mql.addEventListener) mql.addEventListener("change", apply);
    else mql.addListener(apply);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", apply);
      else mql.removeListener(apply);
    };
  }, []);

  // ✅ 컨테이너 크기 기반 계산 (모바일: width, 데스크탑: height)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const CONTROL_AREA = 56; // 상단 컨트롤
      const PADDING = 24; // p-3
      const w = Math.max(240, el.clientWidth - PADDING);
      const h = Math.max(240, el.clientHeight - CONTROL_AREA - PADDING);

      if (isMobile) {
        setPageWidth(w);
        setPageHeight(undefined);
      } else {
        setPageHeight(h);
        setPageWidth(undefined);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  // PDF 파일이 바뀌면 페이지/총페이지 리셋
  useEffect(() => {
    setNumPages(0);
    setPageNumber(1);
  }, [pdfIndex]);

  if (!pdfUrls.length) {
    return (
      <div className="rounded-2xl border bg-background p-10 text-center text-sm text-muted-foreground">
        연결된 PDF가 없습니다.
      </div>
    );
  }

  const fileUrl = resolvePublicUrl(pdfUrls[pdfIndex]);

  const prevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const nextPage = () => setPageNumber((p) => Math.min(numPages || 1, p + 1));

  // ✅ 모바일 스와이프 핸들러
  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // 세로 스크롤 방해 최소화
    const SWIPE_THRESHOLD = 60; // 넘기기 최소 거리
    const MAX_VERTICAL = 90; // 세로 움직임이 너무 크면 스와이프 무시

    if (Math.abs(dy) > MAX_VERTICAL) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    // 왼쪽으로 스와이프 = 다음 페이지
    if (dx < 0) nextPage();
    else prevPage();
  };

  return (
    <div ref={wrapRef} className="w-full h-full min-w-0">
      {/* ✅ 모바일에서 canvas가 가로 튀는 거 방지 (안전장치) */}
      <style>{`
        @media (max-width: 767px) {
          .pdf-mobile-fit .react-pdf__Page__canvas {
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

      <div className="h-full rounded-2xl border border-border bg-background p-3 flex flex-col gap-3 min-w-0">
        {/* ✅ 상단: PDF 선택 탭 + 페이지 정보 */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {pdfUrls.map((u, i) => {
              const name = u.split("/").pop()?.replace(".pdf", "") ?? `pdf-${i + 1}`;
              const active = i === pdfIndex;

              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => setPdfIndex(i)}
                  className={[
                    "px-3 py-1 rounded-full border text-sm transition",
                    "border-border",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted text-foreground",
                  ].join(" ")}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground">
            {numPages ? (
              <>
                Page <b className="text-foreground">{pageNumber}</b> / {numPages}
                {isMobile ? <span className="ml-2 hidden sm:inline">· 스와이프해서 넘겨</span> : null}
              </>
            ) : (
              "페이지 로딩 중…"
            )}
          </div>
        </div>

        {/* ✅ PDF 렌더 영역 */}
        <div className="relative flex-1 min-h-0 min-w-0 overflow-hidden rounded-xl border border-border bg-background">
          {/* ✅ 모바일: 드래그/스와이프 넘김 */}
          <div
            className="w-full h-full min-w-0 overflow-auto flex items-center justify-center pdf-mobile-fit touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Document
              file={fileUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="py-20 text-center text-sm text-muted-foreground">
                  PDF 불러오는 중…
                </div>
              }
              error={
                <div className="py-20 text-center text-sm text-destructive">
                  PDF 로딩 실패: {fileUrl}
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}    // ✅ 모바일은 폭 맞춤
                height={pageHeight}  // ✅ 데스크탑은 높이 맞춤
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>

          {/* ✅ 데스크탑(md 이상): 좌/우 끝 오버레이 버튼 */}
          <div className="pointer-events-none hidden md:block">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={pageNumber <= 1}
              onClick={prevPage}
              className={[
                "pointer-events-auto",
                "absolute left-3 top-1/2 -translate-y-1/2",
                "h-12 w-12 rounded-full",
                "bg-background/70 backdrop-blur border-border shadow-sm",
                "hover:bg-background/90",
              ].join(" ")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={!numPages || pageNumber >= numPages}
              onClick={nextPage}
              className={[
                "pointer-events-auto",
                "absolute right-3 top-1/2 -translate-y-1/2",
                "h-12 w-12 rounded-full",
                "bg-background/70 backdrop-blur border-border shadow-sm",
                "hover:bg-background/90",
              ].join(" ")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* ✅ 데스크탑에서 키보드로도 넘기고 싶으면(선택): 이 부분은 필요하면 말해줘 */}
        </div>

        {/* ✅ 모바일에서는 버튼 대신 힌트(선택) */}
        <div className="md:hidden text-xs text-muted-foreground text-center">
          좌우로 스와이프해서 페이지 넘기기
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pt-20 pb-20 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="font-bold text-4xl text-center">Projects</div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <Dialog key={p.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <CardDescription className="mt-1">{p.oneLiner}</CardDescription>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.slice(0, 8).map((t) => (
                        <Badge key={t} variant="secondary" className="rounded-full">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </DialogTrigger>

              <DialogContent
                className="
                  max-w-none w-[96vw]
                  lg:w-[92vw] lg:max-w-[1400px]
                  h-[92vh]
                  p-0
                  rounded-2xl
                  overflow-hidden
                "
              >
                <div className="flex flex-col h-full">
                  <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-2xl">{p.title}</DialogTitle>
                    <DialogDescription className="text-sm">{p.oneLiner}</DialogDescription>
                  </DialogHeader>

                  <div className="flex-1 min-h-0 overflow-hidden px-6 py-4">
                    <div className="h-[62vh]">
                      <PdfDeckCarousel pdfUrls={p.pdfs} />
                    </div>
                  </div>

                  <div className="border-t px-6 py-4 bg-muted/30">
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {p.description}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline" className="rounded-full">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
