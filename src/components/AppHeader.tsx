import { PanelLeft } from "lucide-react";
import { useSidebarState } from "@/hooks/use-sidebar-state";

export function AppHeader() {
  const { collapsed, toggle } = useSidebarState();

  return (
    <header className="h-12 flex items-center border-b border-border bg-background shrink-0 px-3 gap-3">
      {/* Sidebar toggle */}
      <button
        onClick={toggle}
        className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors text-muted-foreground"
        title={collapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        <PanelLeft className="h-4 w-4" />
      </button>
      {/* Header area reserved for future features */}
    </header>
  );
}
