import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface Announcement {
  id: string;
  icon: string;
  tag: string;
  title: string;
  date: string;
  highlights: { icon: string; title: string; desc: string }[];
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    icon: "🍌",
    tag: "新模型上线！",
    title: "Nano Banana 2 上线——极速生成与专业级画质的完美平衡",
    date: "2026-02-28 12:25:42",
    highlights: [
      {
        icon: "🚀",
        title: "更快的生成速度，更稳定的输出质量",
        desc: '在保证高画面完成度的同时，大幅优化响应效率，实现真正的"闪电级生成速度·专业级画质体验"。',
      },
      {
        icon: "🎯",
        title: "更强的指令遵循能力",
        desc: "对复杂描述、多层级指令的理解更加精准，提示词还原度显著提升，减少反复修改成本。",
      },
      {
        icon: "🎨",
        title: "行业领先的局部修改稳定性",
        desc: "在区域重绘、细节调整、风格替换等场景下，表现更稳定，细节保留更完整，画面过渡更加自然。",
      },
    ],
  },
  {
    id: "2",
    icon: "✨",
    tag: "视频模型已上线！",
    title: "Veo 3.1 视频生成模型正式上线",
    date: "2026-02-25 09:00:00",
    highlights: [
      {
        icon: "🎬",
        title: "电影级画质输出",
        desc: "支持 1080p 高清视频生成，画面细腻逼真，光影效果显著提升。",
      },
      {
        icon: "⚡",
        title: "生成速度提升 3 倍",
        desc: "全新架构优化，视频生成等待时间大幅缩短，创作效率更高。",
      },
    ],
  },
  {
    id: "3",
    icon: "🔗",
    tag: "优先通道已上线",
    title: "Gemini 3.1 Pro & Claude 4.6 系列优先通道",
    date: "2026-02-20 15:30:00",
    highlights: [
      {
        icon: "💎",
        title: "会员专属加速通道",
        desc: "VIP 用户享受独立队列，高峰期也能快速获得响应，告别排队等待。",
      },
      {
        icon: "🧠",
        title: "顶级模型无限制使用",
        desc: "解锁 Gemini 3.1 Pro 与 Claude 4.6 的完整能力，支持超长上下文与复杂推理任务。",
      },
    ],
  },
  {
    id: "4",
    icon: "✨",
    tag: "新模型上线！",
    title: "Gemini 3.1 系列 & Claude Sonnet 4.6",
    date: "2026-02-15 10:00:00",
    highlights: [
      {
        icon: "📊",
        title: "多模态理解再升级",
        desc: "图文混合输入的理解准确度提升 40%，复杂图表与文档分析能力显著增强。",
      },
    ],
  },
  {
    id: "5",
    icon: "🔗",
    tag: "优先通道上线",
    title: "Gemini & Grok 系列模型优先通道",
    date: "2026-02-10 08:00:00",
    highlights: [
      {
        icon: "🚀",
        title: "响应延迟降低 60%",
        desc: "优先通道独享计算资源，确保在任何时段都能获得极速响应体验。",
      },
    ],
  },
  {
    id: "6",
    icon: "✨",
    tag: "新模型上线！",
    title: "Claude-Opus-4.6 正式发布",
    date: "2026-02-05 14:00:00",
    highlights: [
      {
        icon: "🏆",
        title: "旗舰级推理能力",
        desc: "在数学、编程、逻辑推理等基准测试中全面领先，适合处理最复杂的专业任务。",
      },
      {
        icon: "📝",
        title: "超长文本生成",
        desc: "单次输出支持高达 32K tokens，长文写作、代码生成一气呵成。",
      },
    ],
  },
];

function AnnouncementContent() {
  const [selectedId, setSelectedId] = useState(mockAnnouncements[0].id);
  const selected = mockAnnouncements.find((a) => a.id === selectedId)!;
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile: single column, selected detail on top then list
    return (
      <div className="flex flex-col gap-3 px-4 pb-4">
        {/* Detail */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {selected.icon} {selected.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{selected.date}</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {selected.highlights[0]?.desc.slice(0, 60)}...
          </p>
          {selected.highlights.map((h, i) => (
            <div key={i} className="space-y-1">
              <h4 className="text-xs font-semibold text-foreground">
                {h.icon} {h.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="border-t border-border pt-3 space-y-1">
          {mockAnnouncements.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                a.id === selectedId
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              {a.icon} {a.tag} | {a.title.slice(0, 20)}...
            </button>
          ))}
        </div>
      </div>
    );
  }

// Desktop: two-column layout
  return (
    <div className="flex max-h-[480px]">
      {/* Left list */}
      <ScrollArea className="w-[240px] shrink-0 max-h-[480px]">
        <div className="p-2 space-y-1">
          {mockAnnouncements.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                a.id === selectedId
                  ? "bg-accent text-foreground"
                  : "bg-accent/40 text-muted-foreground hover:bg-accent/70"
              }`}
            >
              <span>{a.icon} {a.tag} | {a.title.split("——")[0]}</span>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Right detail */}
      <ScrollArea className="flex-1 max-h-[480px]">
        <div className="p-6 space-y-5 bg-accent/30 min-h-full">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {selected.icon} {selected.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5">{selected.date}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            为进一步提升生成的质量与稳定性，{selected.title.split("——")[0]}现已正式发布。此次升级重点优化了 速度 × 质量 × 可控性，在多个核心维度上带来显著提升：
          </p>

          {selected.highlights.map((h, i) => (
            <div key={i} className="space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">
                {h.icon} {h.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function AnnouncementDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>最新动态</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="max-h-[60vh]">
            <AnnouncementContent />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b border-border">
          <DialogTitle>最新动态</DialogTitle>
        </DialogHeader>
        <AnnouncementContent />
      </DialogContent>
    </Dialog>
  );
}
