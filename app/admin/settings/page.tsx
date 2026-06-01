import { createClient } from '@/lib/supabase/server'
import { SettingForm } from './SettingForm'

export const dynamic = 'force-dynamic'

interface SettingRow {
  key: string
  value: unknown
  updated_at: string | null
}

function formatDateTime(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  const { data: settings, error } = await supabase
    .from('site_settings')
    .select('key, value, updated_at')
    .order('key', { ascending: true })

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <p className="text-red-400">Failed to load site settings: {error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-zinc-400 mt-1">
            {settings?.length || 0} key{(settings?.length || 0) !== 1 ? 's' : ''}, JSONB values
          </p>
        </div>
      </div>

      {!settings || settings.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500">No settings yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(settings as SettingRow[]).map((row) => (
            <div
              key={row.key}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-sm font-mono text-primary-400">{row.key}</h2>
                <span className="text-xs text-zinc-500">
                  Updated {formatDateTime(row.updated_at)}
                </span>
              </div>
              <SettingForm settingKey={row.key} initialValue={row.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
