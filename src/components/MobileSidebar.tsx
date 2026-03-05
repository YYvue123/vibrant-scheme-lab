import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { useMockAuth } from "@/hooks/use-mock-auth";
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
  Menu,
  X,
  LogIn,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import qrcodeImg from "@/assets/qrcode.png";

const navItems = [
  { icon: MessageSquare, label: "AI 对话", path: "/ai-chat" },
  { icon: Image, label: "AI 生图", path: "/ai-image" },
  { icon: Video, label: "AI 视频", path: "/ai-video" },
  { icon: Music, label: "AI 音频", path: "/ai-audio" },
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
  const { isLoggedIn, user, login, logout } = useMockAuth();

  const [vipOpen, setVipOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  

  const totalQuota = user ? user.subscriptionQuota + user.extraQuota : 0;

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

          {/* Scrollable nav area */}
          <div className="flex-1 overflow-y-auto min-h-0">
          {/* Nav */}
          <nav className="flex flex-col pt-1 px-3">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-2.5 rounded-lg text-xs transition-colors px-3 h-9 cursor-pointer ${
                  active
                      ? "bg-accent font-medium text-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          </div>

          {/* Bottom - sticky */}
          <div className="flex flex-col px-3 pb-4 border-t border-border/30 pt-2 shrink-0">
            {/* VIP */}
            <button
              onClick={() => { setVipOpen(true); onOpenChange(false); }}
              className="flex items-center gap-2.5 rounded-lg text-xs transition-colors px-3 h-9 text-amber-500 hover:bg-accent cursor-pointer"
            >
              <Crown className="h-4 w-4 shrink-0" />
              <span>开通会员</span>
            </button>

            {/* Redeem */}
            <button
              onClick={() => { setRedeemOpen(true); onOpenChange(false); }}
              className="flex items-center gap-2.5 rounded-lg text-xs transition-colors px-3 h-9 text-foreground hover:bg-accent cursor-pointer"
            >
              <Gift className="h-4 w-4 shrink-0" />
              <span>兑换</span>
            </button>

            {/* Customer service */}
            <button
              onClick={() => { setServiceOpen(true); onOpenChange(false); }}
              className="flex items-center gap-2.5 rounded-lg text-xs transition-colors px-3 h-9 text-foreground hover:bg-accent cursor-pointer"
            >
              <Headphones className="h-4 w-4 shrink-0" />
              <span>在线客服</span>
            </button>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2.5 rounded-lg text-xs transition-colors px-3 h-9 text-foreground hover:bg-accent cursor-pointer"
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4 shrink-0" />
              ) : (
                <Sun className="h-4 w-4 shrink-0" />
              )}
              <span>{theme === "dark" ? "深色" : "浅色"}</span>
            </button>

            {/* User info bar or login prompt */}
            {isLoggedIn ? (
              <div className="mt-2 p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user?.name}</span>
                    <span className="text-xs text-primary font-medium">⚡ {totalQuota}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">订阅额度:</span>
                    <span className="text-xs font-bold">{user?.subscriptionQuota} / {user?.subscriptionQuotaMax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">更多配额:</span>
                    <span className="text-xs font-bold">{user?.extraQuota}</span>
                  </div>
                </div>


                <div className="flex gap-2 mt-3 pt-2 border-t border-border">
                  <button
                    onClick={() => { setLogoutOpen(true); onOpenChange(false); }}
                    className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 hover:opacity-80 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    退出登录
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { login(); onOpenChange(false); }}
                className="mt-2 flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <LogIn className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">登录 / 注册</span>
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>


      {/* VIP Drawer */}
      <Drawer open={vipOpen} onOpenChange={setVipOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>开通会员</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-2">
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
          <DrawerHeader className="text-left">
            <DrawerTitle>兑换</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-2">
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

      {/* Customer Service Drawer */}
      <Drawer open={serviceOpen} onOpenChange={setServiceOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>在线客服</DrawerTitle>
            <DrawerDescription>扫码联系客服</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-2 flex justify-center">
            <img src={qrcodeImg} alt="客服二维码" className="w-48 rounded" />
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
          <DrawerHeader className="text-left">
            <DrawerTitle>确认退出登录？</DrawerTitle>
            <DrawerDescription>退出登录后将返回登录页面，您的数据不会丢失。</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex-row gap-3">
            <DrawerClose asChild>
              <button className="flex-1 h-10 rounded-lg bg-accent text-foreground text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer">
                取消
              </button>
            </DrawerClose>
            <button
              onClick={() => { setLogoutOpen(false); logout(); }}
              className="flex-1 h-10 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors cursor-pointer"
            >
              确认退出
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
