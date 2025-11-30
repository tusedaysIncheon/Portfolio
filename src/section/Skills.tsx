import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Github from "@/assets/github.png";
import html from "@/assets/html.png";
import css from "@/assets/css.png";
import js from "@/assets/js.png";
import react from "@/assets/react.png";
import ts from "@/assets/typescript.png";
import tailwind from "@/assets/tailwind.png";

function SkillItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl hover:bg-muted/30 transition">
      <img src={icon} className="w-20 h-20 object-contain" />
      <Badge className="px-3 py-1 text-sm">{label}</Badge>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pt-20 pb-20 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="font-bold text-5xl text-center mb-20">Skills</div>

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
                <SkillItem icon={Github} label="Github" />
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
