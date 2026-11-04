import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111518]">
      <div className="flex flex-col items-center gap-4">
        <Loader2
          size={40}
          className="animate-spin text-[#C6F36B]"
        />

        <p className="text-sm text-[#94A3B8]">
          Loading studios...
        </p>
      </div>
    </div>
  );
};

export default Loading;