import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(3),
  price: z.coerce.number().min(1),
  storage: z.string().min(2),
  color: z.string().min(2),
  condition: z.string().min(2),
  ptaStatus: z.string().min(2)
});

type FormValues = z.infer<typeof schema>;

export const ProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", price: 0, storage: "", color: "", condition: "used-excellent", ptaStatus: "pta" }
  });

  const onSubmit = (values: FormValues) => {
    toast.success(`Draft saved for ${values.title}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2">
      {[
        ["Product title", "title", "text"],
        ["Price", "price", "number"],
        ["Storage", "storage", "text"],
        ["Color", "color", "text"],
        ["Condition", "condition", "text"],
        ["PTA status", "ptaStatus", "text"]
      ].map(([label, name, type]) => (
        <label key={name} className="space-y-2 text-sm font-medium text-slate-700">
          <span>{label}</span>
          <input type={type} {...register(name as keyof FormValues, type === "number" ? { valueAsNumber: true } : undefined)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent" />
          {errors[name as keyof FormValues] ? <span className="text-xs text-rose-500">{String(errors[name as keyof FormValues]?.message)}</span> : null}
        </label>
      ))}
      <div className="flex justify-end lg:col-span-2">
        <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-bronze">Save product draft</button>
      </div>
    </form>
  );
};
