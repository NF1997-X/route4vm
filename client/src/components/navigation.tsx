import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Waves, ListChecks, Bookmark, Plus, Rows, Layout, Palette, Route as RouteIcon, Receipt, Sparkles, BookOpen, Link2, Table2, Save, DoorOpen } from "lucide-react";
import { useLocation } from "wouter";

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
  onBulkColorEdit?: () => void;
  isAuthenticated?: boolean;
  theme?: string;
  onSetTheme?: (theme: 'dark' | 'light' | 'ocean') => void;
}

export function Navigation({ editMode, onEditModeRequest, onShowCustomization, onAddRow, onSaveData, onGenerateTng, onAddColumn, onOptimizeRoute, onCalculateTolls, onSaveLayout, onSavedLinks, onBulkColorEdit, isAuthenticated, theme, onSetTheme }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-all duration-300">
        <div className="max-w-full mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/assets/Logofm.png" 
                  alt="Logo" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-black dark:text-white font-bold text-[10px] tracking-tight">
                {editMode ? "Edit Mode" : "Route Management"}
              </div>
            </div>

            {/* Right Side: Theme Switcher + Menu */}
            <div className="flex items-center gap-4">
              {/* Theme Switcher */}
              <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10">
                <button
                  onClick={() => onSetTheme?.('dark')}
                  className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black/90 dark:hover:text-white/90'}`}
                  title="Dark Mode"
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSetTheme?.('light')}
                  className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black/90 dark:hover:text-white/90'}`}
                  title="Light Mode"
                >
                  <Sun className="w-4 h-4" />
                </button>
                {isEditMode && (
                  <button
                    onClick={() => onSetTheme?.('ocean')}
                    className={`p-2 rounded-lg transition-all ${theme === 'ocean' ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black/90 dark:hover:text-white/90'}`}
                    title="Ocean Mode"
                  >
                    <Waves className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col gap-1.5 p-2 transition-all"
              >
                <span className={`block w-6 h-0.5 bg-black dark:bg-white rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black dark:bg-white rounded transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black dark:bg-white rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full right-6 mt-3 w-56 bg-white dark:bg-black/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl p-2 shadow-xl max-h-[500px] overflow-y-auto">
            {/* Primary Actions */}
            {editMode ? (
              <>
                <button
                  onClick={() => { onSaveData?.(); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-green-600 dark:text-green-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm font-medium flex items-center gap-3"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                <button
                  onClick={() => { onEditModeRequest?.(); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm font-medium flex items-center gap-3"
                >
                  <DoorOpen className="w-4 h-4" />
                  Exit Edit Mode
                </button>
              </>
            ) : (
              <button
                onClick={() => { onEditModeRequest?.(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm font-medium flex items-center gap-3"
              >
                <DoorOpen className="w-4 h-4" />
                Enter Edit Mode
              </button>
            )}

            <div className="h-px bg-black/10 dark:bg-white/10 my-1" />

            {/* VM Route Actions */}
            {editMode && (
              <>
                <button
                  onClick={() => { navigate('/share/tzqe9a'); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                >
                  <Link2 className="w-4 h-4" />
                  Share Link
                </button>
                <button
                  onClick={() => { navigate('/custom/8m2v27'); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                >
                  <Table2 className="w-4 h-4" />
                  Custom Page
                </button>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
              </>
            )}

            <button
              onClick={() => { navigate('/custom-tables'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
            >
              <ListChecks className="w-4 h-4" />
              All Custom Tables
            </button>

            <button
              onClick={() => { onSavedLinks?.(); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
            >
              <Bookmark className="w-4 h-4" />
              Saved Links
            </button>

            {/* Edit Actions */}
            {editMode && (
              <>
                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                
                <button
                  onClick={() => { onAddRow?.(); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                >
                  <Rows className="w-4 h-4" />
                  Add Row
                </button>

                {onAddColumn && (
                  <button
                    onClick={() => {
                      const addColumnButton = document.querySelector('[data-testid="button-add-column"]') as HTMLButtonElement;
                      if (addColumnButton) addColumnButton.click();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                  >
                    <Plus className="w-4 h-4" />
                    Add Column
                  </button>
                )}

                <button
                  onClick={() => { onShowCustomization?.(); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                >
                  <Layout className="w-4 h-4" />
                  Customize Columns
                </button>

                <button
                  onClick={() => { onBulkColorEdit?.(); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                >
                  <Palette className="w-4 h-4" />
                  Bulk Color Edit
                </button>

                {onOptimizeRoute && (
                  <button
                    onClick={() => { onOptimizeRoute(); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                  >
                    <RouteIcon className="w-4 h-4" />
                    Optimize Route
                  </button>
                )}

                {onCalculateTolls && (
                  <button
                    onClick={() => { onCalculateTolls(); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                  >
                    <Receipt className="w-4 h-4" />
                    Calculate Tolls
                  </button>
                )}

                {onGenerateTng && (
                  <button
                    onClick={() => { onGenerateTng(); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate TNG
                  </button>
                )}

                {onSaveLayout && (
                  <button
                    onClick={() => { onSaveLayout(); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
                  >
                    <Layout className="w-4 h-4" />
                    Save Layout
                  </button>
                )}
              </>
            )}

            <div className="h-px bg-black/10 dark:bg-white/10 my-1" />

            <button
              onClick={() => { navigate('/help'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-black/90 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3"
            >
              <BookOpen className="w-4 h-4" />
              User Guide
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
