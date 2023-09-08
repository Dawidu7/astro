import { Children, cloneElement, isValidElement } from "react"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export default function Group({
  children,
  className,
  separator,
  ...props
}: { separator?: string } & ComponentProps<"div">) {
  const count = Children.count(children)

  return (
    <div
      className={twMerge("flex items-center gap-2", className)}
      role="group"
      {...props}
    >
      {Children.map(
        children,
        (child, i) =>
          isValidElement(child) && (
            <>
              {cloneElement(child as JSX.Element, { className: "flex-1" })}
              {separator && i < count - 1 && (
                <span className="text-xl">{separator}</span>
              )}
            </>
          ),
      )}
    </div>
  )
}

Group.displayName = "Group"
