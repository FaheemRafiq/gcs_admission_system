import { AtSign } from 'lucide-react'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function EmailInput(props: InputProps) {
  return (
    <div className="relative">
      <Input {...props} type="email" className={cn(`peer ps-9`, props.className)} />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <AtSign size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  )
}
