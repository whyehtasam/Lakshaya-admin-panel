import React from 'react'
import { Button } from "@/components/ui/button"

const SideButton = ({children,className,...props}) => {
  return (
    <Button className={className} {...props} variant='outline'>{children}</Button>
  )
}

export default SideButton