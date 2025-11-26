import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Database, Settings, Save, DoorOpen, Rows, Receipt, Layout, Sun, Moon, Bookmark, Plus, ChevronDown, Menu, BookOpen, LayoutGrid, ListChecks, Edit2, Table2, Link2, Sparkles, Palette } from "lucide-react";
import { useLocation } from "wouter";
import { AddColumnModal } from "./add-column-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

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
  const [, navigate] = useLocation();

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
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/40 group-hover:scale-105">
                <img 
                  src="/assets/Logofm.png" 
                  alt="Logo" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              <div className="flex flex-col gap-0.5 leading-tight">
                <span className="font-semibold text-gray-900 dark:text-white leading-none tracking-tight transition-colors" style={{ fontSize: '13px' }}>
                  {editMode ? "Edit Mode" : "Route Management"}
                </span>
                <span className="text-gray-500 dark:text-gray-400 leading-none tracking-wide" style={{ fontSize: '10px' }}>
                  All in one data informations
                </span>
              </div>
            </div>
          </div>

          {/* Navigation - Single Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-blue-200/50 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 hover:border-blue-400/60 dark:hover:border-blue-400/50 hover:bg-white dark:hover:bg-black/95 h-10 px-4 rounded-full transition-all duration-300 ease-out group data-[state=open]:shadow-xl data-[state=open]:shadow-blue-500/30 data-[state=open]:border-blue-500/60"
                data-testid="button-main-menu"
                title="Menu"
              >
                <LayoutGrid className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-90" />
                <span className="hidden md:inline ml-2 text-xs font-medium text-gray-700 dark:text-gray-200">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              sideOffset={12}
              className="w-[calc(100vw-2rem)] sm:w-auto min-w-[280px] max-w-[320px] bg-white/95 dark:bg-black/95 backdrop-blur-3xl border border-blue-200/40 dark:border-blue-500/30 shadow-[0_24px_80px_0_rgba(59,130,246,0.15)] dark:shadow-[0_24px_80px_0_rgba(59,130,246,0.35)] rounded-3xl overflow-hidden p-2 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            >
              {/* VM Route Submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-all duration-200 focus:bg-blue-50/80 dark:focus:bg-blue-950/40 data-[state=open]:bg-blue-50/80 dark:data-[state=open]:bg-blue-950/40"
                  data-testid="menu-vm-route"
                >
                  <Edit2 className="w-4 h-4 mr-3 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">VM Route</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent 
                    className="w-[calc(100vw-2rem)] sm:w-auto min-w-[280px] max-w-[320px] bg-white/98 dark:bg-black/98 backdrop-blur-3xl border border-blue-200/40 dark:border-blue-500/30 shadow-[0_24px_80px_0_rgba(59,130,246,0.2)] dark:shadow-[0_24px_80px_0_rgba(59,130,246,0.4)] rounded-3xl overflow-hidden p-2"
                    sideOffset={8}
                    alignOffset={-8}
                  >
                    {editMode && (
                      <>
                        <DropdownMenuItem 
                          onClick={() => navigate('/share/tzqe9a')}
                          className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-all duration-200 focus:bg-blue-50/80 dark:focus:bg-blue-950/40"
                          data-testid="submenu-share-example"
                        >
                          <Link2 className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Share Link (Preview)</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => navigate('/custom/8m2v27')}
                          className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200 focus:bg-green-50/80 dark:focus:bg-green-950/40"
                          data-testid="submenu-custom-example"
                        >
                          <Table2 className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Custom Page (Preview)</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1.5 bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent h-px" />
                      </>
                    )}
                    <DropdownMenuItem 
                      onClick={() => navigate('/custom-tables')}
                      className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-purple-50/80 dark:hover:bg-purple-950/40 transition-all duration-200 focus:bg-purple-50/80 dark:focus:bg-purple-950/40"
                      data-testid="submenu-custom-list"
                    >
                      <ListChecks className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">All Custom Tables</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={onSavedLinks}
                      className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-amber-50/80 dark:hover:bg-amber-950/40 transition-all duration-200 focus:bg-amber-50/80 dark:focus:bg-amber-950/40"
                      data-testid="submenu-saved-links"
                    >
                      <Bookmark className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">All Saved Links</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              {/* Settings Submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200 focus:bg-gray-100/80 dark:focus:bg-gray-800/40 data-[state=open]:bg-gray-100/80 dark:data-[state=open]:bg-gray-800/40"
                  data-testid="menu-settings"
                >
                  <Settings className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent 
                    className="w-[calc(100vw-2rem)] sm:w-auto min-w-[280px] max-w-[320px] bg-white/98 dark:bg-black/98 backdrop-blur-3xl border border-blue-200/40 dark:border-blue-500/30 shadow-[0_24px_80px_0_rgba(59,130,246,0.2)] dark:shadow-[0_24px_80px_0_rgba(59,130,246,0.4)] rounded-3xl overflow-hidden p-2"
                    sideOffset={8}
                    alignOffset={-8}
                  >
                    <DropdownMenuItem 
                      onClick={onToggleTheme}
                      className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200 focus:bg-gray-100/80 dark:focus:bg-gray-800/40"
                      data-testid="submenu-toggle-theme"
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
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate('/help')}
                      className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200 focus:bg-green-50/80 dark:focus:bg-green-950/40"
                      data-testid="submenu-help-guide"
                    >
                      <BookOpen className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">User Guide</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator className="my-1.5 bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent h-px" />

              {/* Edit Mode Options Submenu */}
              {editMode ? (
                <>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-all duration-200 focus:bg-blue-50/80 dark:focus:bg-blue-950/40 data-[state=open]:bg-blue-50/80 dark:data-[state=open]:bg-blue-950/40"
                      data-testid="menu-edit-actions"
                    >
                      <Database className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Edit Actions</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent 
                        className="w-[calc(100vw-2rem)] sm:w-auto min-w-[280px] max-w-[320px] bg-white/98 dark:bg-black/98 backdrop-blur-3xl border border-blue-200/40 dark:border-blue-500/30 shadow-[0_24px_80px_0_rgba(59,130,246,0.2)] dark:shadow-[0_24px_80px_0_rgba(59,130,246,0.4)] rounded-3xl overflow-hidden p-2"
                        sideOffset={8}
                        alignOffset={-8}
                      >
                        <DropdownMenuItem 
                          onClick={onAddRow}
                          className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 transition-all duration-200 focus:bg-blue-50/80 dark:focus:bg-blue-950/40"
                          data-testid="submenu-add-row"
                        >
                          <Rows className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Add Row</span>
                        </DropdownMenuItem>
                        {onAddColumn && (
                          <DropdownMenuItem 
                            onClick={() => {
                              const addColumnButton = document.querySelector('[data-testid="button-add-column"]') as HTMLButtonElement;
                              if (addColumnButton) addColumnButton.click();
                            }}
                            className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200 focus:bg-green-50/80 dark:focus:bg-green-950/40"
                            data-testid="submenu-add-column"
                          >
                            <Plus className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Add Column</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={onBulkColorEdit}
                          className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-purple-50/80 dark:hover:bg-purple-950/40 transition-all duration-200 focus:bg-purple-50/80 dark:focus:bg-purple-950/40"
                          data-testid="submenu-bulk-color"
                        >
                          <Palette className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Bulk Edit Color</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1.5 bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent h-px" />
                        <DropdownMenuItem 
                          onClick={onSaveLayout}
                          className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-green-50/80 dark:hover:bg-green-950/40 transition-all duration-200 focus:bg-green-50/80 dark:focus:bg-green-950/40"
                          data-testid="submenu-save-layout"
                        >
                          <Save className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Save Layout</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator className="my-1.5 bg-gradient-to-r from-transparent via-gray-300/60 dark:via-gray-600/40 to-transparent h-px" />
                  <DropdownMenuItem 
                    onClick={onEditModeRequest}
                    className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-red-50/80 dark:hover:bg-red-950/40 transition-all duration-200 focus:bg-red-50/80 dark:focus:bg-red-950/40"
                    data-testid="menu-exit-edit"
                  >
                    <DoorOpen className="w-4 h-4 mr-3 text-red-600 dark:text-red-400" />
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">Exit Edit Mode</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem 
                  onClick={onEditModeRequest}
                  className="cursor-pointer rounded-xl px-3 py-2.5 hover:bg-red-50/80 dark:hover:bg-red-950/40 transition-all duration-200 focus:bg-red-50/80 dark:focus:bg-red-950/40"
                  data-testid="menu-enter-edit"
                >
                  <Settings className="w-4 h-4 mr-3 text-red-600 dark:text-red-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Edit Mode</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hidden Add Column Modal - triggered from dropdown */}
          {editMode && onAddColumn && (
            <div className="hidden">
              <AddColumnModal
                onCreateColumn={onAddColumn}
                disabled={!isAuthenticated}
              />
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}