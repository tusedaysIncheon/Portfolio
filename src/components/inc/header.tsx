import logo from "@/assets/logo.png";
import Whitelogo from "@/assets/whiteLogo.png";
import { NavigationBar } from "./NavigationBar";
import { ModeToggle } from "../mode-toggle";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";

function Header() {
  const { theme } = useTheme();

  const curruntLogo = theme === "dark" ? Whitelogo : logo;

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    const headerHeight = 56; // h-14 = 56px

    if (section) {
      const y =
        section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-50 bg-gray-50  dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <img src={curruntLogo} alt="logo" className="w-10 h-10" />
        <div className="hidden md:block">
          <NavigationBar />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => scrollTo("hero")}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollTo("about")}>
                  About
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollTo("projects")}>
                  Projects
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollTo("skills")}>
                  Skills
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollTo("contact")}>
                  Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
