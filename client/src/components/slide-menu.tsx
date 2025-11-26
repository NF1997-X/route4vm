import { 
  Edit2, 
  Settings, 
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
  const [, navigate] = useLocation();

  const handleItemClick = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md z-[60] animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
        style={{
          WebkitBackdropFilter: 'blur(12px)',
          backdropFilter: 'blur(12px)',
        }}
      />
      
      {/* Menu Panel - Simple Single Page */}
      <div 
        className="fixed top-16 right-4 z-[70] w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[70vh] max-h-[600px] overflow-y-auto p-4 space-y-2">
          {/* Edit Mode Buttons */}
          {editMode ? (
            <>
              <button
                onClick={() => handleItemClick(onSaveData!)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => handleItemClick(onEditModeRequest!)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                <DoorOpen className="w-5 h-5" />
                <span>Exit Edit Mode</span>
              </button>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />
            </>
          ) : (
            <>
              <button
                onClick={() => handleItemClick(onEditModeRequest!)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              >
                <Edit2 className="w-5 h-5" />
                <span>Enter Edit Mode</span>
              </button>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />
            </>
          )}

          {/* VM Route Section */}
          {editMode && (
            <>
              <button
                onClick={() => handleItemClick(() => navigate('/share/tzqe9a'))}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Link2 className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-200">Share Link</span>
              </button>
              <button
                onClick={() => handleItemClick(() => navigate('/custom/8m2v27'))}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Table2 className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-200">Custom Page</span>
              </button>
            </>
          )}

          <button
            onClick={() => handleItemClick(() => navigate('/custom-tables'))}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ListChecks className="w-5 h-5 text-purple-500" />
            <span className="text-gray-700 dark:text-gray-200">All Custom Tables</span>
          </button>

          <button
            onClick={() => handleItemClick(onSavedLinks!)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span className="text-gray-700 dark:text-gray-200">Saved Links</span>
          </button>

          {/* Edit Actions */}
          {editMode && (
            <>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />
              
              <button
                onClick={() => handleItemClick(onAddRow!)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Rows className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-200">Add Row</span>
              </button>

              {onAddColumn && (
                <button
                  onClick={() => {
                    const addColumnButton = document.querySelector('[data-testid="button-add-column"]') as HTMLButtonElement;
                    if (addColumnButton) addColumnButton.click();
                    onOpenChange(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-200">Add Column</span>
                </button>
              )}

              <button
                onClick={() => handleItemClick(onShowCustomization!)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Layout className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-200">Customize Columns</span>
              </button>

              <button
                onClick={() => handleItemClick(onBulkColorEdit!)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Palette className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700 dark:text-gray-200">Bulk Color Edit</span>
              </button>

              {onOptimizeRoute && (
                <button
                  onClick={() => handleItemClick(onOptimizeRoute)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <RouteIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700 dark:text-gray-200">Optimize Route</span>
                </button>
              )}

              {onCalculateTolls && (
                <button
                  onClick={() => handleItemClick(onCalculateTolls)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Receipt className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700 dark:text-gray-200">Calculate Tolls</span>
                </button>
              )}

              {onGenerateTng && (
                <button
                  onClick={() => handleItemClick(onGenerateTng)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <span className="text-gray-700 dark:text-gray-200">Generate TNG</span>
                </button>
              )}

              {onSaveLayout && (
                <button
                  onClick={() => handleItemClick(onSaveLayout)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Layout className="w-5 h-5 text-cyan-500" />
                  <span className="text-gray-700 dark:text-gray-200">Save Layout</span>
                </button>
              )}

              {onShowTutorial && (
                <button
                  onClick={() => handleItemClick(onShowTutorial)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-violet-500" />
                  <span className="text-gray-700 dark:text-gray-200">Show Tutorial</span>
                </button>
              )}
            </>
          )}

          {/* Settings */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />
          
          <button
            onClick={() => handleItemClick(onToggleTheme!)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-gray-700 dark:text-gray-200">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <button
            onClick={() => handleItemClick(() => navigate('/help'))}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 dark:text-gray-200">User Guide</span>
          </button>
        </div>
      </div>
    </>
  );
}
