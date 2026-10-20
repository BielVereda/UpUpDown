export default function CatalogLayout({ sidebar, children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
      <div className="lg:contents">
        {sidebar}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
