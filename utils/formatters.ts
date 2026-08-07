export function formatTimeSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getDomainColor(domainId: string): { bg: string; text: string; border: string; badge: string } {
  switch (domainId) {
    case 'A':
      return { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' };
    case 'B':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800' };
    case 'C':
      return { bg: 'bg-indigo-500/10', text: 'text-indigo-600', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-800' };
    case 'D':
      return { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' };
    case 'E':
      return { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800' };
    case 'F':
      return { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-600', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-800' };
  }
}
