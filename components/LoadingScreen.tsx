import { Loader2Icon } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50">
      <Loader2Icon className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
}
