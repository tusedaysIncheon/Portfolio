import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {  Github,
  html,
  css,
  js,
  react,
  ts,
  tailwind,
  java,
  springboot,
  git,
  oracle,
  postgres,
  docker,
  k8s } from "@/assets/index"

function SkillItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl hover:bg-muted/30 transition p-2">
      <div className="w-20 h-20 flex items-center justify-center">
        <img src={icon} className="max-w-full max-h-full object-contain" />
      </div>
      <Badge variant={"outline"} className="px-3 py-1 text-sm">{label}</Badge>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pt-20 pb-20 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="font-bold text-4xl text-center mb-20">Skills</div>

        <div className="grid gap-5">
          {/* Front-end */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-2xl text-center">
                Front-end
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <SkillItem icon={html} label="HTML" />
                <SkillItem icon={css} label="CSS" />
                <SkillItem icon={js} label="JavaScript" />
                <SkillItem icon={ts} label="TypeScript" />
                <SkillItem icon={tailwind} label="Tailwind" />
                <SkillItem icon={react} label="React" />
              </div>
            </CardContent>
          </Card>

          {/* Back-end */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-2xl text-center">
                Back-end
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <SkillItem icon={java} label="Java" />
                <SkillItem icon={springboot} label="SpringBoot" />
              </div>
            </CardContent>
          </Card>

          {/* DB & Ops */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-2xl text-center">
                Data-Base & Ops
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <SkillItem icon={Github} label="Github" />
                <SkillItem icon={git} label="Git" />
                <SkillItem icon={docker} label="Docker" />
                <SkillItem icon={k8s} label="Kubernetes" />
                <SkillItem icon={oracle} label="Oracle" />
                <SkillItem icon={postgres} label="PostgreSQL" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
