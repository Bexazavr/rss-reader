const roles = {
  guest: {
    label: 'guest',
    description: [
      'You can browse and interact with everything,',
      'but nothing is saved between sessions.',
      'Register and get activated to keep your data.',
    ],
  },
  friend: {
    label: 'friend',
    description: [
      'Full access. Everything is saved to your account.',
      'Log out and come back anytime —',
      'your data will be here.',
    ],
  },
}

export function RoleBadge({ role }: { role: 'guest' | 'friend' }) {
  const { label, description } = roles[role]

  return (
    <div className="relative group">
      <span className="px-3 py-1.5 text-sm text-muted-foreground cursor-default select-none">
        {label}
      </span>
      <div className="absolute left-0 top-full mt-2 z-50 hidden group-hover:block">
        <div className="w-64 rounded-lg border bg-popover p-3 text-xs text-muted-foreground shadow-md space-y-1">
          {description.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
