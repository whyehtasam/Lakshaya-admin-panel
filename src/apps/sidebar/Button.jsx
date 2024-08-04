import React from 'react'
import { Button } from "@/components/ui/button"
import { toast,Toaster } from 'sonner'

const SideButton = ({children,className,...props}) => {
  return (
    <>
    {/* <Toaster richColors/> */}
    <Button className={className + " active:scale-95 transition-all"} {...props} >{children}</Button>
    </>
  )
}

export default SideButton