import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { SlideMenu } from "./slide-menu";

interface NavigationProps {
  editMode?: boolean;
  onEditModeRequest?: () => void;
  onShowCustomization?: () => void;
  onAddRow?: () => void;
  onSaveData?: () => void;
  onGenerateTng?: () => void;
  onAddColumn?: (columnData: { name: string; dataKey: string; type: string; options?: string[] }) => Promise<void>;
  onOptimizeRoute?: () => void;
  onCalculateTolls?: () => void;
  onSaveLayout?: () => void;
  onSavedLinks?: () => void;
  onShowTutorial?: () => void;
  onBulkColorEdit?: () => void;
  isAuthenticated?: boolean;
  theme?: string;
  onToggleTheme?: () => void;
}

export function Navigation({ editMode, onEditModeRequest, onShowCustomization, onAddRow, onSaveData, onGenerateTng, onAddColumn, onOptimizeRoute, onCalculateTolls, onSaveLayout, onSavedLinks, onShowTutorial, onBulkColorEdit, isAuthenticated, theme, onToggleTheme }: NavigationProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b-2 border-blue-500/50 dark:border-blue-400/50 bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-700/10 dark:from-blue-500/20 dark:via-blue-600/20 dark:to-blue-700/20 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-blue-500/20">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex h-16 items-center justify-between text-[12px]">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2.5 group cursor-pointer">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-[14px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                <img 
                  src="/assets/Logofm.png" 
                  alt="Logo" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-tight">
                <span className="font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent leading-none tracking-tight transition-all" style={{ fontSize: '13px', letterSpacing: '-0.02em' }}>
                  {editMode ? "Edit Mode" : "Route Manager"}
                </span>
                <span className="text-gray-500 dark:text-gray-400 leading-none font-medium" style={{ fontSize: '10px', letterSpacing: '-0.01em' }}>
                  Data Management
                </span>
              </div>
            </div>
          </div>

          {/* Navigation - Single Menu Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 shadow-md hover:shadow-lg hover:border-gray-300/70 dark:hover:border-gray-600/60 hover:bg-white dark:hover:bg-gray-900 h-10 px-4 rounded-[14px] transition-all duration-200 ease-out group"
            data-testid="button-main-menu"
            title="Menu"
          >
            <LayoutGrid className="w-4 h-4 text-gray-700 dark:text-gray-200 transition-transform duration-200 group-hover:scale-110" />
            <span className="hidden md:inline ml-2 text-xs font-semibold text-gray-700 dark:text-gray-200">Menu</span>
          </Button>
        </div>
      </div>

      {/* Slide Menu */}
      <SlideMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        editMode={editMode}
        onEditModeRequest={onEditModeRequest}
        onShowCustomization={onShowCustomization}
        onAddRow={onAddRow}
        onSaveData={onSaveData}
        onGenerateTng={onGenerateTng}
        onAddColumn={onAddColumn}
        onOptimizeRoute={onOptimizeRoute}
        onCalculateTolls={onCalculateTolls}
        onSaveLayout={onSaveLayout}
        onSavedLinks={onSavedLinks}
        onShowTutorial={onShowTutorial}
        onBulkColorEdit={onBulkColorEdit}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </nav>
  );
}
