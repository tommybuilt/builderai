// Sanity-check script for the admin allowlist comparison in
// app/api/auth/magic-link/route.ts.
//
// Replicates the pure function used by that route plus by
// lib/supabase/middleware.ts. No DB access, no env vars: this just runs the
// comparison against hand-built inputs and asserts expected outputs. Useful
// as a regression check whenever the comparison logic is touched.
//
// Run:
//   node scripts/verify-admin-allowlist.mjs
// Exits non-zero if any case fails.

function isAllowlisted(allowlist, submittedEmail) {
  if (typeof submittedEmail !== 'string') return false
  const email = submittedEmail.trim().toLowerCase()
  if (!email) return false
  if (!Array.isArray(allowlist)) return false
  return allowlist
    .filter((e) => typeof e === 'string')
    .map((e) => e.toLowerCase())
    .includes(email)
}

const cases = [
  {
    label: 'exact match',
    allowlist: ['admin@example.com'],
    input: 'admin@example.com',
    expect: true,
  },
  {
    label: 'submitted email upper, allowlist lower',
    allowlist: ['admin@example.com'],
    input: 'ADMIN@EXAMPLE.COM',
    expect: true,
  },
  {
    label: 'allowlist mixed case, submitted lower',
    allowlist: ['Support@TPSWorldwideLLC.com'],
    input: 'support@tpsworldwidellc.com',
    expect: true,
  },
  {
    label: 'both sides upper',
    allowlist: ['ADMIN@EXAMPLE.COM'],
    input: 'ADMIN@EXAMPLE.COM',
    expect: true,
  },
  {
    label: 'submitted email not in list',
    allowlist: ['admin@example.com'],
    input: 'evil@bad.com',
    expect: false,
  },
  {
    label: 'empty allowlist rejects all',
    allowlist: [],
    input: 'admin@example.com',
    expect: false,
  },
  {
    label: 'whitespace trimmed from submitted email',
    allowlist: ['admin@example.com'],
    input: '  admin@example.com  ',
    expect: true,
  },
  {
    label: 'whitespace in allowlist entry is NOT trimmed (data-quality flag)',
    allowlist: [' admin@example.com'],
    input: 'admin@example.com',
    expect: false,
  },
  {
    label: 'non-string allowlist entries are filtered out',
    allowlist: [123, null, undefined, 'admin@example.com'],
    input: 'admin@example.com',
    expect: true,
  },
  {
    label: 'non-string submitted email is rejected',
    allowlist: ['admin@example.com'],
    input: 12345,
    expect: false,
  },
  {
    label: 'empty submitted email is rejected',
    allowlist: ['admin@example.com'],
    input: '',
    expect: false,
  },
  {
    label: 'allowlist with multiple entries, second matches',
    allowlist: ['support@tpsworldwidellc.com', 'admin@example.com'],
    input: 'admin@example.com',
    expect: true,
  },
]

let passed = 0
let failed = 0
for (const c of cases) {
  const actual = isAllowlisted(c.allowlist, c.input)
  const ok = actual === c.expect
  if (ok) {
    passed++
  } else {
    failed++
  }
  const tag = ok ? 'PASS' : 'FAIL'
  console.log(`${tag}  ${c.label} -> got ${actual}, expected ${c.expect}`)
}

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
