import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { useState } from "react";
import {
  MessageSquare,
  Image,
  Video,
  Music,
  Crown,
  Gift,
  Headphones,
  Sun,
  Moon,
  LogOut,
  Settings,
  User,
  Zap,
  Info,
  PanelLeft,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import qrcodeImg from "@/assets/qrcode.png";

const navItems = [
  { icon: MessageSquare, label: "AI 对话", path: "/ai-chat" },
  { icon: Image, label: "AI 生图", path: "/ai-image" },
  { icon: Video, label: "AI 视频", path: "/ai-video" },
  { icon: Music, label: "AI 音频", path: "/ai-audio" },
];

const quotaModels = [
  { name: "Claude-Opus-4.6", icon: "🟣", cost: 3 },
  { name: "Gemini-3-Pro-Thinking", icon: "🔵", cost: 1 },
  { name: "Gemini-3-Pro", icon: "🔵", cost: 1 },
  { name: "Gemini-3-Flash", icon: "🔵", cost: 1 },
  { name: "Grok-4.1", icon: "⚫", cost: 1 },
  { name: "Rita-Pro", icon: "🟢", cost: 1 },
  { name: "Rita", icon: "🟢", cost: 0, free: true },
  { name: "GPT-5.1", icon: "⚪", cost: 1 },
  { name: "GPT-5.2", icon: "⚪", cost: 1 },
  { name: "GPT-5.1-Thinking", icon: "⚪", cost: 1 },
  { name: "DeepSeek-V3.1", icon: "🔵", cost: 1 },
  { name: "Claude-4.5-Sonnet", icon: "🟠", cost: 1 },
  { name: "Claude-Opus-4.6-Thinking", icon: "🟣", cost: 3 },
];

// Wrapper: collapsed shows tooltip on hover
function SidebarItem({
  collapsed,
  label,
  children,
}: {
  collapsed: boolean;
  label: string;
  children: React.ReactNode;
}) {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  return <>{children}</>;
}

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { collapsed, toggle } = useSidebarState();

  const [vipOpen, setVipOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [avatarPopover, setAvatarPopover] = useState(false);
  const [quotaDrawerOpen, setQuotaDrawerOpen] = useState(false);

  const sidebarWidth = collapsed ? "w-[52px]" : "w-[180px]";

  return (
    <>
      <aside
        className={`flex flex-col h-screen bg-sidebar border-r border-border shrink-0 transition-all duration-200 ${sidebarWidth}`}
      >
        {/* Header: Rita + collapse toggle */}
        <div className={`h-12 flex items-center shrink-0 ${collapsed ? "justify-center px-1" : "justify-between px-3"}`}>
          {!collapsed && (
            <button
              onClick={() => navigate("/")}
              className="text-sm font-semibold italic tracking-tight text-foreground cursor-pointer"
            >
              Rita
            </button>
          )}
          <button
            onClick={toggle}
            className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-sidebar-hover transition-colors text-sidebar-foreground shrink-0 cursor-pointer"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Top nav */}
        <nav className="flex flex-col gap-0.5 pt-2 px-2 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <SidebarItem key={item.path} collapsed={collapsed} label={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-10 cursor-pointer ${
                    collapsed ? "justify-center px-0" : ""
                  } ${
                    active
                      ? "bg-primary/15 text-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-hover"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              </SidebarItem>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col gap-0.5 px-2 pb-3">
          {/* VIP */}
          <SidebarItem collapsed={collapsed} label="开通会员">
            <button
              onClick={() => setVipOpen(true)}
              className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-10 text-amber-500 hover:bg-sidebar-hover cursor-pointer ${
                collapsed ? "justify-center px-0" : ""
              }`}
            >
              <Crown className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">开通会员</span>}
            </button>
          </SidebarItem>

          {/* Redeem */}
          <SidebarItem collapsed={collapsed} label="兑换">
            <button
              onClick={() => setRedeemOpen(true)}
              className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-10 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
                collapsed ? "justify-center px-0" : ""
              }`}
            >
              <Gift className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">兑换</span>}
            </button>
          </SidebarItem>

          {/* Customer service */}
          <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
            <SidebarItem collapsed={collapsed} label="在线客服">
              <PopoverTrigger asChild>
                <button
                  className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-10 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
                    collapsed ? "justify-center px-0" : ""
                  }`}
                >
                  <Headphones className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">在线客服</span>}
                </button>
              </PopoverTrigger>
            </SidebarItem>
            <PopoverContent side="right" className="w-48 p-2">
              <p className="text-xs text-muted-foreground mb-2 text-center">扫码联系客服</p>
              <img src={qrcodeImg} alt="客服二维码" className="w-full rounded" />
            </PopoverContent>
          </Popover>

          {/* Theme toggle */}
          <SidebarItem collapsed={collapsed} label={theme === "dark" ? "浅色模式" : "深色模式"}>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-10 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
                collapsed ? "justify-center px-0" : ""
              }`}
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px] shrink-0" />
              ) : (
                <Moon className="h-[18px] w-[18px] shrink-0" />
              )}
              {!collapsed && <span className="truncate">{theme === "dark" ? "浅色" : "深色"}</span>}
            </button>
          </SidebarItem>

          {/* Avatar */}
          <Popover open={avatarPopover} onOpenChange={setAvatarPopover}>
            <PopoverTrigger asChild>
              <button
                className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-2 h-10 hover:bg-sidebar-hover cursor-pointer ${
                  collapsed ? "justify-center px-0" : ""
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                {!collapsed && (
                  <div className="flex items-center gap-1.5 text-sidebar-foreground">
                    <span className="text-xs truncate">用户</span>
                    <span className="text-xs text-primary font-medium">⚡ 838</span>
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent side="right" align="end" className="w-64 p-0">
              {/* Plan & Quota section */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">你的计划</span>
                  <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">可用</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">订阅额度:</span>
                    <span className="font-bold">10 / 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">更多配额:</span>
                    <span className="font-bold">828</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAvatarPopover(false);
                    setQuotaDrawerOpen(true);
                  }}
                  className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <Info className="h-3 w-3" />
                  配额使用说明
                </button>
              </div>

              {/* Actions */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setAvatarPopover(false);
                    setSettingsOpen(true);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent transition-colors cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  对话设置
                </button>
                <button
                  onClick={() => {
                    setAvatarPopover(false);
                    setLogoutOpen(true);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent text-destructive transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </aside>

      {/* Quota Drawer */}
      <Drawer open={quotaDrawerOpen} onOpenChange={setQuotaDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>配额使用说明</DrawerTitle>
            <DrawerDescription>不同模型每次对话消耗的配额数量</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-2 space-y-2 max-h-[50vh] overflow-y-auto">
            {quotaModels.map((m) => (
              <div key={m.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/40">
                <div className="flex items-center gap-3">
                  <span className="text-base">{m.icon}</span>
                  <span className="text-sm">{m.name}</span>
                </div>
                {m.free ? (
                  <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded">免费</span>
                ) : (
                  <span className="flex items-center gap-1 text-primary text-sm font-medium">
                    <Zap className="h-3.5 w-3.5" />
                    {m.cost}
                  </span>
                )}
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="w-full h-10 rounded-lg bg-accent text-foreground text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer">
                关闭
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* VIP Drawer */}
      <Drawer open={vipOpen} onOpenChange={setVipOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>开通会员</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <p className="text-muted-foreground text-sm">会员功能正在开发中，敬请期待！解锁更多高级功能与更多配额。</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="w-full h-10 rounded-lg bg-accent text-foreground text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer">
                关闭
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Redeem Drawer */}
      <Drawer open={redeemOpen} onOpenChange={setRedeemOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>兑换</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <p className="text-muted-foreground text-sm">请输入您的兑换码以兑换相应配额或会员权益。兑换功能即将上线。</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="w-full h-10 rounded-lg bg-accent text-foreground text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer">
                关闭
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Settings Drawer */}
      <Drawer open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>对话设置</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <p className="text-muted-foreground text-sm">对话设置功能正在开发中，您可以在此调整对话相关偏好设置。</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="w-full h-10 rounded-lg bg-accent text-foreground text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer">
                关闭
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Logout Drawer */}
      <Drawer open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>确认退出登录？</DrawerTitle>
            <DrawerDescription>退出登录后将返回登录页面，您的数据不会丢失。</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <button
              onClick={() => setLogoutOpen(false)}
              className="w-full h-10 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors cursor-pointer"
            >
              确认退出
            </button>
            <DrawerClose asChild>
              <button className="w-full h-10 rounded-lg bg-accent text-foreground text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer">
                取消
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
