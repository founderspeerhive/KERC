export default function AdminPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Welcome to the KERC Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your KERC resources, users, and settings from this central dashboard.
        </p>
      </div>
    </>
  )
}
