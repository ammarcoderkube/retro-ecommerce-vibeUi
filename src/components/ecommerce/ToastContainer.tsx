import { useCart } from '@/context/CartContext'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export function ToastContainer() {
  const { toasts, removeToast } = useCart()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border border-zinc-700/80 bg-zinc-900/95 text-zinc-100 backdrop-blur-xl animate-in slide-in-from-right duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'destructive' && (
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h4 className="text-sm font-semibold">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-zinc-400 mt-0.5">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
