import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className="m-4">
        <LoaderCircle className="animate-spin h-6 w-6" />
    </div>
  )
}

export default Spinner