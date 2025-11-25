import logo from '@/assets/logo.png';
import Whitelogo from '@/assets/whiteLogo.png';
import { NevigationBar } from './NevigationBar';
import { ModeToggle } from '../mode-toggle';
import { useTheme } from '../theme-provider';

function Header() {
  
    const { theme } = useTheme();

    const curruntLogo = theme === "dark" ? Whitelogo : logo;

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-50">
      <div className='max-w-7xl mx-auto px-6 h-full flex items-center justify-between'>
        <img src={curruntLogo} alt="logo" className="w-10 h-10" />
        <NevigationBar/>
        <ModeToggle/>
        </div>
    </header>
  )
}

export default Header
