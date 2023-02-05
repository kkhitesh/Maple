export const LoadingPost = () => {
  return (
    <div
      className="relative space-y-5 overflow-hidden border-b-2
      p-4
    before:absolute before:inset-0
    before:-translate-x-full
    before:-skew-x-12
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r before:from-transparent before:via-[rgba(0,0,0,15%)]
    before:to-transparent
    hover:bg-[rgba(0,0,0,5%)]"
    >
      <div className="h-5 w-2/5 rounded-lg bg-[rgba(0,0,0,10%)]"></div>
      <div className="h-44 rounded-lg bg-[rgba(0,0,0,10%)]"></div>
      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-[rgba(0,0,0,10%)]"></div>
        <div className="h-3 w-4/5 rounded-lg bg-[rgba(0,0,0,10%)]"></div>
        <div className="h-3 w-2/5 rounded-lg bg-[rgba(0,0,0,10%)]"></div>
      </div>
    </div>
  );
};
