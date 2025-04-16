import * as React from "react"
import { cn } from "@/lib/utils"

const Form = React.forwardRef<
    HTMLFormElement,
    React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
    return (
        <form
            ref={ref}
            className={cn("space-y-4", className)}
            {...props}
        />
    )
})
Form.displayName = "Form"

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("space-y-2", className)}
            {...props}
        />
    )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
            {...props}
        >
            {props.children}
            {props["aria-required"] && <span className="text-destructive ml-0.5">*</span>}
        </label>
    )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("relative", className)}
            {...props}
        />
    )
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn("text-sm font-medium text-destructive", className)}
            {...props}
        >
            {children}
        </p>
    )
})
FormMessage.displayName = "FormMessage"

export { Form, FormItem, FormLabel, FormControl, FormMessage } 