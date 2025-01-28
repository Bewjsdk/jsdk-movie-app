import { FC, ReactNode } from "react"

const Wrapper: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="wrapper">
      {children}
    </div>
  )
}

export default Wrapper