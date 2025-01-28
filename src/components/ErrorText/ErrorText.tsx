import { ReactNode } from "react"

const ErrorText = ({ children }: {children: ReactNode}) => {
  return (
    <p className="text-red-500">
      {children}
    </p>
  )
}

export default ErrorText