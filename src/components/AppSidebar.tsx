import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { useMockAuth } from "@/hooks/use-mock-auth";
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
  User,
  PanelLeft,
  LogIn,
  Bell,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { AnnouncementDialog } from "@/components/AnnouncementDialog";

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
  const { isLoggedIn, user, login, logout } = useMockAuth();

  const [vipOpen, setVipOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [avatarPopover, setAvatarPopover] = useState(false);

  const sidebarWidth = collapsed ? "w-[52px]" : "w-[180px]";
  const totalQuota = user ? user.subscriptionQuota + user.extraQuota : 0;

  return (
    <>
      <aside
        className={`flex flex-col h-screen bg-sidebar border-r border-border/20 shrink-0 transition-all duration-200 ${sidebarWidth}`}
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
        <nav className="flex flex-col gap-1 pt-2 px-2 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <SidebarItem key={item.path} collapsed={collapsed} label={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 rounded-lg text-[15px] transition-colors px-3 h-11 cursor-pointer ${
                    collapsed ? "justify-center px-0" : ""
                  } ${
                  active
                      ? "bg-sidebar-hover font-medium text-sidebar-foreground"
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
        <div className="flex flex-col gap-1 px-2 pb-3">
          {/* VIP */}
          <SidebarItem collapsed={collapsed} label="开通会员">
            <button
              onClick={() => setVipOpen(true)}
              className={`flex items-center gap-3 rounded-lg text-[15px] transition-colors px-3 h-11 text-amber-500 hover:bg-sidebar-hover cursor-pointer ${
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
              className={`flex items-center gap-3 rounded-lg text-[15px] transition-colors px-3 h-11 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
                collapsed ? "justify-center px-0" : ""
              }`}
            >
              <Gift className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">兑换</span>}
            </button>
          </SidebarItem>

          {/* Announcement */}
          <SidebarItem collapsed={collapsed} label="最新动态">
            <button
              onClick={() => setAnnouncementOpen(true)}
              className={`relative flex items-center gap-3 rounded-lg text-[15px] transition-colors px-3 h-11 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
                collapsed ? "justify-center px-0" : ""
              }`}
            >
              <div className="relative">
                <Bell className="h-[18px] w-[18px] shrink-0" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
              </div>
              {!collapsed && <span className="truncate">最新动态</span>}
            </button>
          </SidebarItem>

          {/* Customer service */}
          <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
            <SidebarItem collapsed={collapsed} label="在线客服">
              <PopoverTrigger asChild>
                <button
                  className={`flex items-center gap-3 rounded-lg text-[15px] transition-colors px-3 h-11 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
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
          <SidebarItem collapsed={collapsed} label={theme === "dark" ? "深色模式" : "浅色模式"}>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 rounded-lg text-[15px] transition-colors px-2 h-11 text-sidebar-foreground hover:bg-sidebar-hover cursor-pointer ${
                collapsed ? "justify-center px-0" : ""
              }`}
            >
              {theme === "dark" ? (
                <Moon className="h-[18px] w-[18px] shrink-0" />
              ) : (
                <Sun className="h-[18px] w-[18px] shrink-0" />
              )}
              {!collapsed && <span className="truncate">{theme === "dark" ? "深色" : "浅色"}</span>}
            </button>
          </SidebarItem>

          {/* Avatar / Login area */}
          {isLoggedIn ? (
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
                      <span className="text-xs truncate">{user?.name}</span>
                      <span className="text-xs text-primary font-medium">⚡ {totalQuota}</span>
                    </div>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" align="end" className="w-64 p-0 border-border/40">
                {/* Plan & Quota section */}
                <div className="p-4 border-b border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">你的计划</span>
                    <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">可用</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">订阅额度:</span>
                      <span className="font-bold">{user?.subscriptionQuota} / {user?.subscriptionQuotaMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">更多配额:</span>
                      <span className="font-bold">{user?.extraQuota}</span>
                    </div>
                  </div>
                </div>

                {/* Actions - no 对话设置 */}
                <div className="p-1">
                  <button
                    onClick={() => {
                      setAvatarPopover(false);
                      setLogoutOpen(true);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent text-red-500 dark:text-red-400 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    退出登录
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            /* Non-logged-in state */
            <SidebarItem collapsed={collapsed} label="登录 / 注册">
              <button
                onClick={login}
                className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-2 h-10 hover:bg-sidebar-hover cursor-pointer ${
                  collapsed ? "justify-center px-0" : ""
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <LogIn className="h-4 w-4 text-primary" />
                </div>
                {!collapsed && (
                  <span className="text-sm font-medium text-primary">登录 / 注册</span>
                )}
              </button>
            </SidebarItem>
          )}
        </div>
      </aside>

      {/* Dialogs */}
      <Dialog open={vipOpen} onOpenChange={setVipOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>开通会员</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">会员功能正在开发中，敬请期待！解锁更多高级功能与更多配额。</p>
        </DialogContent>
      </Dialog>

      <Dialog open={redeemOpen} onOpenChange={setRedeemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>兑换</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">请输入您的兑换码以兑换相应配额或会员权益。兑换功能即将上线。</p>
        </DialogContent>
      </Dialog>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认退出登录？</AlertDialogTitle>
            <AlertDialogDescription>
              退出登录后将返回登录页面，您的数据不会丢失。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setLogoutOpen(false); logout(); }} className="cursor-pointer">
              确认退出
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AnnouncementDialog open={announcementOpen} onOpenChange={setAnnouncementOpen} />
    </>
  );
}
