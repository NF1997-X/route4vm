import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Edit2, 
  Settings, 
  Database,
  Link2,
  Table2,
  ListChecks,
  Bookmark,
  Sun,
  Moon,
  BookOpen,
  Rows,
  Plus,
  Save,
  Route as RouteIcon,
  Receipt,
  Layout,
  Palette,
  Sparkles,
  DoorOpen
} from "lucide-react";
import { useLocation } from "wouter";

interface SlideMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  theme?: string;
  onToggleTheme?: () => void;
}

type MenuView = 'main' | 'vm-route' | 'settings' | 'edit-actions';

export function SlideMenu({
  open,
  onOpenChange,
  editMode,
  onEditModeRequest,
  onShowCustomization,
  onAddRow,
  onSaveData,
  onGenerateTng,
  onAddColumn,
  onOptimizeRoute,
  onCalculateTolls,
  onSaveLayout,
  onSavedLinks,
  onShowTutorial,
  onBulkColorEdit,
  theme,
  onToggleTheme,
}: SlideMenuProps) {
  const [currentView, setCurrentView] = useState<MenuView>('main');
  const [, navigate] = useLocation();

  const handleSubmenuClick = (view: MenuView) => {
    setCurrentView(view);
  };

  const handleBackClick = () => {
    setCurrentView('main');
  };

  const handleItemClick = (action: () => void) => {
    action();
    onOpenChange(false);
    setCurrentView('main');
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={() => {
          onOpenChange(false);
          setCurrentView('main');
        }}
      />
      
      {/* Menu Panel - Premium iOS Style */}
      <div className="fixed top-16 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px] bg-white/98 dark:bg-gray-900/98 backdrop-blur-3xl border border-gray-200/40 dark:border-gray-700/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] rounded-[24px] overflow-hidden">
        <div className="relative h-[70vh] max-h-[600px] overflow-hidden">
          {/* Main Menu */}
          <div 
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              currentView === 'main' ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-4 h-full overflow-y-auto space-y-1">
              {/* VM Route */}
              <button
                onClick={() => handleSubmenuClick('vm-route')}
                className="w-full flex items-center justify-between cursor-pointer rounded-[16px] px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 active:scale-[0.97] transition-all duration-150 group"
              >
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-shadow">
                    <Edit2 className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">VM Route</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500 text-xl font-light">›</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => handleSubmenuClick('settings')}
                className="w-full flex items-center justify-between cursor-pointer rounded-[16px] px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 active:scale-[0.97] transition-all duration-150 group"
              >
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-shadow">
                    <Settings className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Settings</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500 text-xl font-light">›</span>
              </button>

              <div className="my-3 h-[0.5px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

              {/* Edit Mode Options */}
              {editMode && (
                <button
                  onClick={() => handleSubmenuClick('edit-actions')}
                  className="w-full flex items-center justify-between cursor-pointer rounded-[16px] px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 active:scale-[0.97] transition-all duration-150 group"
                >
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-shadow">
                      <Database className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Edit Actions</span>
                  </div>
                  <span className="text-gray-400 dark:text-gray-500 text-xl font-light">›</span>
                </button>
              )}

              {/* Direct Actions */}
              {editMode ? (
                <>
                  <button
                    onClick={() => handleItemClick(onSaveData!)}
                    className="w-full flex items-center cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-green-50 dark:hover:bg-green-950/50 active:scale-[0.98] transition-all duration-200 mb-1"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                      <Save className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Save Changes</span>
                  </button>
                  <button
                    onClick={() => handleItemClick(onEditModeRequest!)}
                    className="w-full flex items-center cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-red-50 dark:hover:bg-red-950/50 active:scale-[0.98] transition-all duration-200 mb-1"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mr-3">
                      <DoorOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Exit Edit Mode</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleItemClick(onEditModeRequest!)}
                  className="w-full flex items-center cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-blue-50 dark:hover:bg-blue-950/50 active:scale-[0.98] transition-all duration-200 mb-1"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                    <DoorOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Enter Edit Mode</span>
                </button>
              )}
            </div>
          </div>

          {/* VM Route Submenu */}
          <div 
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              currentView === 'vm-route' ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-2 h-full overflow-y-auto">
              <button
                onClick={handleBackClick}
                className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200 mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Back</span>
              </button>

              <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent" />

              {editMode && (
                <>
                  <button
                    onClick={() => handleItemClick(() => navigate('/share/tzqe9a'))}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-all duration-200"
                  >
                    <Link2 className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Share Link (Preview)</span>
                  </button>
                  <button
                    onClick={() => handleItemClick(() => navigate('/custom/8m2v27'))}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200"
                  >
                    <Table2 className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Custom Page (Preview)</span>
                  </button>
                  <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent" />
                </>
              )}

              <button
                onClick={() => handleItemClick(() => navigate('/custom-tables'))}
                className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-purple-50/80 dark:hover:bg-purple-950/40 transition-all duration-200"
              >
                <ListChecks className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">All Custom Tables</span>
              </button>
              <button
                onClick={() => handleItemClick(onSavedLinks!)}
                className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-amber-50/80 dark:hover:bg-amber-950/40 transition-all duration-200"
              >
                <Bookmark className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">All Saved Links</span>
              </button>
            </div>
          </div>

          {/* Settings Submenu */}
          <div 
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              currentView === 'settings' ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-2 h-full overflow-y-auto">
              <button
                onClick={handleBackClick}
                className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200 mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Back</span>
              </button>

              <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent" />

              <button
                onClick={() => handleItemClick(onToggleTheme!)}
                className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 mr-3 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleItemClick(() => navigate('/help'))}
                className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">User Guide</span>
              </button>
            </div>
          </div>

          {/* Edit Actions Submenu */}
          {editMode && (
            <div 
              className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                currentView === 'edit-actions' ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="p-2 h-full overflow-y-auto">
                <button
                  onClick={handleBackClick}
                  className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200 mb-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Back</span>
                </button>

                <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent" />

                <button
                  onClick={() => handleItemClick(onAddRow!)}
                  className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-all duration-200"
                >
                  <Rows className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Add Row</span>
                </button>

                {onAddColumn && (
                  <button
                    onClick={() => {
                      const addColumnButton = document.querySelector('[data-testid="button-add-column"]') as HTMLButtonElement;
                      if (addColumnButton) addColumnButton.click();
                      onOpenChange(false);
                      setCurrentView('main');
                    }}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Add Column</span>
                  </button>
                )}

                <button
                  onClick={() => handleItemClick(onShowCustomization!)}
                  className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-purple-50/80 dark:hover:bg-purple-950/40 transition-all duration-200"
                >
                  <Layout className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Customize Columns</span>
                </button>

                <button
                  onClick={() => handleItemClick(onBulkColorEdit!)}
                  className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-pink-50/80 dark:hover:bg-pink-950/40 transition-all duration-200"
                >
                  <Palette className="w-4 h-4 mr-3 text-pink-600 dark:text-pink-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Bulk Color Edit</span>
                </button>

                <div className="my-1.5 h-px bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent" />

                {onOptimizeRoute && (
                  <button
                    onClick={() => handleItemClick(onOptimizeRoute)}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-orange-50/80 dark:hover:bg-orange-950/40 transition-all duration-200"
                  >
                    <RouteIcon className="w-4 h-4 mr-3 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Optimize Route</span>
                  </button>
                )}

                {onCalculateTolls && (
                  <button
                    onClick={() => handleItemClick(onCalculateTolls)}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-teal-50/80 dark:hover:bg-teal-950/40 transition-all duration-200"
                  >
                    <Receipt className="w-4 h-4 mr-3 text-teal-600 dark:text-teal-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Calculate Tolls</span>
                  </button>
                )}

                {onGenerateTng && (
                  <button
                    onClick={() => handleItemClick(onGenerateTng)}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4 mr-3 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Generate TNG</span>
                  </button>
                )}

                {onSaveLayout && (
                  <button
                    onClick={() => handleItemClick(onSaveLayout)}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40 transition-all duration-200"
                  >
                    <Layout className="w-4 h-4 mr-3 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Save Layout</span>
                  </button>
                )}

                {onShowTutorial && (
                  <button
                    onClick={() => handleItemClick(onShowTutorial)}
                    className="w-full flex items-center cursor-pointer rounded-xl px-3 py-2.5 hover:bg-violet-50/80 dark:hover:bg-violet-950/40 transition-all duration-200"
                  >
                    <BookOpen className="w-4 h-4 mr-3 text-violet-600 dark:text-violet-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Show Tutorial</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
