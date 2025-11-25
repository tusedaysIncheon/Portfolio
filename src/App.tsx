import Header from "./components/inc/header"
import { ThemeProvider } from "./components/theme-provider"
import About from "./section/About"
import Contact from "./section/Contact"
import Hero from "./section/Hero"
import Projects from "./section/Projects"
import Skills from "./section/Skills"

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className="scroll-smooth pt-20 bg-gray-50  dark:bg-black">
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
