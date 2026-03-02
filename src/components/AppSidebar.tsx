import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
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

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [vipOpen, setVipOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [avatarPopover, setAvatarPopover] = useState(false);

  return (
    <>
      <aside className="flex flex-col h-screen w-[72px] bg-sidebar border-r border-border shrink-0">
        {/* Top nav */}
        <nav className="flex flex-col items-center gap-1 pt-4 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg text-[11px] gap-1 transition-colors ${
                  active
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-hover"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col items-center gap-1 pb-3">
          {/* VIP */}
          <button
            onClick={() => setVipOpen(true)}
            className="flex flex-col items-center justify-center w-14 h-12 rounded-lg text-[11px] gap-0.5 text-amber-500 hover:bg-sidebar-hover transition-colors"
          >
            <Crown className="h-4 w-4" />
            <span>开通会员</span>
          </button>

          {/* Redeem */}
          <button
            onClick={() => setRedeemOpen(true)}
            className="flex flex-col items-center justify-center w-14 h-12 rounded-lg text-[11px] gap-0.5 text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
          >
            <Gift className="h-4 w-4" />
            <span>兑换</span>
          </button>

          {/* Customer service */}
          <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
            <PopoverTrigger asChild>
              <button className="flex flex-col items-center justify-center w-14 h-12 rounded-lg text-[11px] gap-0.5 text-sidebar-foreground hover:bg-sidebar-hover transition-colors">
                <Headphones className="h-4 w-4" />
                <span>在线客服</span>
              </button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-48 p-2">
              <p className="text-xs text-muted-foreground mb-2 text-center">扫码联系客服</p>
              <img src={qrcodeImg} alt="客服二维码" className="w-full rounded" />
            </PopoverContent>
          </Popover>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center w-14 h-12 rounded-lg text-[11px] gap-0.5 text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{theme === "dark" ? "浅色" : "深色"}</span>
          </button>

          {/* Avatar */}
          <Popover open={avatarPopover} onOpenChange={setAvatarPopover}>
            <PopoverTrigger asChild>
              <button className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <User className="h-4 w-4 text-primary" />
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
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="h-3 w-3" />
                      配额使用说明
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="right" className="w-64 p-3">
                    <p className="text-xs font-medium mb-2">配额使用说明</p>
                    <div className="space-y-1.5">
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
                  </PopoverContent>
                </Popover>
              </div>

              {/* Actions */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setAvatarPopover(false);
                    setSettingsOpen(true);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  对话设置
                </button>
                <button
                  onClick={() => {
                    setAvatarPopover(false);
                    setLogoutOpen(true);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded hover:bg-accent text-destructive transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </button>
              </div>
            </PopoverContent>
          </Popover>
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
