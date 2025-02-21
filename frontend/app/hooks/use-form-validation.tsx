import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";

/**
 * Custom hook for form validation using Zod schema and react-hook-form.
 *
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema for form validation.
 * @param {z.infer<T>} defaultValues - The default values for the form fields.
 * @returns {UseFormReturn<z.infer<T>>} - The form object that can be used for validation.
 *
 * @example
 * const formSchema = z.object({
 *   email: z.string().email({ message: "Invalid email address" }),
 *   password: z.string().min(8, { message: "Password should be at least 8 characters." }),
 * });
 *
 * const form = useFormValidation(formSchema, { email: "", password: "" });
 *
 * return (
 *   <form onSubmit={form.handleSubmit((values) => console.log(values))}>
 *     <input {...form.register("email")} />
 *     <input {...form.register("password")} type="password" />
 *     <button type="submit">Submit</button>
 *   </form>
 * );
 */
export default function useFormValidation<T extends ZodSchema>(
    schema: T,
    defaultValues: z.infer<T>,
): UseFormReturn<z.infer<T>> {
    return useForm<z.infer<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    });
}
