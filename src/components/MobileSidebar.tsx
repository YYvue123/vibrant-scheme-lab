import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
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
  Menu,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
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

export function MobileSidebarTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent transition-colors cursor-pointer"
      aria-label="打开菜单"
    >
      <Menu className="h-5 w-5 text-foreground" />
    </button>
  );
}

export function MobileSidebar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [vipOpen, setVipOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [quotaOpen, setQuotaOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-[260px] p-0 flex flex-col [&>button]:hidden">
          <SheetTitle className="sr-only">导航菜单</SheetTitle>
          {/* Header */}
          <div className="h-12 flex items-center justify-between px-4 shrink-0">
            <button
              onClick={() => handleNav("/")}
              className="text-sm font-semibold italic tracking-tight text-foreground cursor-pointer"
            >
              Rita
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-0.5 pt-2 px-3 flex-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-11 cursor-pointer ${
                    active
                      ? "bg-primary/15 text-primary font-medium"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="flex flex-col gap-0.5 px-3 pb-4 border-t border-border pt-3">
            {/* VIP */}
            <button
              onClick={() => { setVipOpen(true); onOpenChange(false); }}
              className="flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-11 text-amber-500 hover:bg-accent cursor-pointer"
            >
              <Crown className="h-[18px] w-[18px] shrink-0" />
              <span>开通会员</span>
            </button>

            {/* Redeem */}
            <button
              onClick={() => { setRedeemOpen(true); onOpenChange(false); }}
              className="flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-11 text-foreground hover:bg-accent cursor-pointer"
            >
              <Gift className="h-[18px] w-[18px] shrink-0" />
              <span>兑换</span>
            </button>

            {/* Customer service */}
            <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-11 text-foreground hover:bg-accent cursor-pointer">
                  <Headphones className="h-[18px] w-[18px] shrink-0" />
                  <span>在线客服</span>
                </button>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="w-48 p-2">
                <p className="text-xs text-muted-foreground mb-2 text-center">扫码联系客服</p>
                <img src={qrcodeImg} alt="客服二维码" className="w-full rounded" />
              </PopoverContent>
            </Popover>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-lg text-sm transition-colors px-3 h-11 text-foreground hover:bg-accent cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px] shrink-0" />
              ) : (
                <Moon className="h-[18px] w-[18px] shrink-0" />
              )}
              <span>{theme === "dark" ? "浅色" : "深色"}</span>
            </button>

            {/* User info bar */}
            <div className="mt-2 p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">用户</span>
                  <span className="text-xs text-primary font-medium">⚡ 838</span>
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">订阅额度:</span>
                  <span className="text-xs font-bold">10 / 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">更多配额:</span>
                  <span className="text-xs font-bold">828</span>
                </div>
              </div>

              <button
                onClick={() => setQuotaOpen(!quotaOpen)}
                className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Info className="h-3 w-3" />
                配额使用说明
              </button>

              {quotaOpen && (
                <div className="mt-2 pt-2 border-t border-border space-y-1.5">
                  {quotaModels.map((m) => (
                    <div key={m.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]">{m.icon}</span>
                        <span>{m.name}</span>
                      </div>
                      {m.free ? (
                        <span className="text-emerald-500 text-[11px]">免费</span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-primary">
                          <Zap className="h-3 w-3" />
                          {m.cost}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-3 pt-2 border-t border-border">
                <button
                  onClick={() => { setSettingsOpen(true); onOpenChange(false); }}
                  className="flex items-center gap-1.5 text-xs text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5" />
                  对话设置
                </button>
                <button
                  onClick={() => { setLogoutOpen(true); onOpenChange(false); }}
                  className="flex items-center gap-1.5 text-xs text-destructive hover:opacity-80 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

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

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>对话设置</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">对话设置功能正在开发中，您可以在此调整对话相关偏好设置。</p>
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
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => setLogoutOpen(false)}>
              确认退出
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
