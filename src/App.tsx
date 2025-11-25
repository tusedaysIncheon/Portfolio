import Header from "./components/inc/header"
import { ThemeProvider } from "./components/theme-provider"
import About from "./section/about"
import Contact from "./section/contact"
import Hero from "./section/hero"
import Projects from "./section/projects"
import Skills from "./section/skills"

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className="scroll-smooth pt-20">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </ThemeProvider>
  )
}

export default App
