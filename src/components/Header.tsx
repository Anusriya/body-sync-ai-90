import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Home } from "lucide-react";

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header = ({ onLogoClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      <div className="flex items-center gap-3">
        {onLogoClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogoClick}
            className="glass flex items-center gap-2 px-4"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Home className="w-3 h-3 text-background" />
            </div>
            <span className="font-semibold gradient-text font-poppins">Sync'd</span>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;