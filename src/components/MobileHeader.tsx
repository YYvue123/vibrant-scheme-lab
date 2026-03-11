import { useState } from "react";
import { Crown, Zap, User } from "lucide-react";
import { useMockAuth } from "@/hooks/use-mock-auth";
import { MobileSidebarTrigger } from "@/components/MobileSidebar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { isLoggedIn, user } = useMockAuth();
  const [vipOpen, setVipOpen] = useState(false);

  const totalQuota = user ? user.subscriptionQuota + user.extraQuota : 0;

  return (
    <>
      <header className="h-12 flex items-center justify-between px-2 shrink-0 border-b border-border/30 bg-background z-30">
        <div className="flex items-center gap-1">
          <MobileSidebarTrigger onClick={onMenuOpen} />

          {isLoggedIn && user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1.5 px-2 h-8 rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-xs font-medium text-foreground">配额余额</span>
                  <Zap className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500">{totalQuota}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56 p-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                    <span className="text-xs text-emerald-500 font-medium">⚡ {totalQuota}</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">订阅额度:</span>
                    <span className="text-xs font-bold">
                      <span className="text-emerald-500">{user.subscriptionQuota}</span> / {user.subscriptionQuotaMax}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">更多配额:</span>
                    <span className="text-xs font-bold">{user.extraQuota}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">剩余时间:</span>
                    <span className="text-xs font-bold">{user.remainingTime}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {isLoggedIn && (
          <button
            onClick={() => setVipOpen(true)}
            className="flex items-center gap-1 px-2.5 h-7 rounded-md bg-amber-500/15 hover:bg-amber-500/25 transition-colors cursor-pointer"
          >
            <Crown className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-medium text-amber-500">升级/续费</span>
          </button>
        )}
      </header>

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
    </>
  );
}
