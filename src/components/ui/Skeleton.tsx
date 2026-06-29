/** Reusable page skeleton shown via loading.tsx during route transitions. */
export function PageSkeleton({ withSidebar = false }: { withSidebar?: boolean }) {
  return (
    <div className="animate-pulse">
      <section className="relative overflow-hidden border-b border-line pt-28 lg:pt-36">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-y" aria-hidden />
        <div className="container-lec relative pb-14 lg:pb-20">
          <div className="h-3 w-40 rounded bg-black/[0.04]" />
          <div className="mt-7 h-3 w-24 rounded bg-black/[0.04]" />
          <div className="mt-5 h-12 w-3/4 rounded-lg bg-black/[0.05]" />
          <div className="mt-3 h-12 w-1/2 rounded-lg bg-black/[0.05]" />
          <div className="mt-6 h-4 w-2/3 rounded bg-black/[0.04]" />
          <div className="mt-8 flex gap-3">
            <div className="h-11 w-40 rounded-full bg-black/[0.05]" />
            <div className="h-11 w-36 rounded-full bg-black/[0.04]" />
          </div>
        </div>
      </section>
      <section className="container-lec py-16">
        <div className={withSidebar ? "grid gap-10 lg:grid-cols-[1.5fr_1fr]" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
          {Array.from({ length: withSidebar ? 2 : 6 }).map((_, i) => (
            <div key={i} className="h-44 rounded-2xl border border-line bg-black/[0.03]" />
          ))}
        </div>
      </section>
    </div>
  );
}
