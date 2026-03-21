import { categoryMetadata } from "@/lib/elements";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import React from "react";
import { Label } from "./ui/label";
import { LoaderPinwheel } from "lucide-react";

const filtersSchema = z.object({
  categories: z.array(z.string()),
  technicalValueRange: z
    .object({
      min: z.number().min(0.1).max(1.0),
      max: z.number().min(0.1).max(1.0),
    })
    .refine(({ min, max }) => min <= max),
});

export type FiltersType = {
  categories: string[];
  technicalValueRange: { min: number; max: number };
};

interface FiltersProps {
  filters: FiltersType;
  onFiltersChanged?: (filters: FiltersType) => void;
}

export function Filters({ filters, onFiltersChanged }: FiltersProps) {
  const form = useForm<z.infer<typeof filtersSchema>>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      categories: filters.categories,
      technicalValueRange: {
        min: filters.technicalValueRange.min,
        max: filters.technicalValueRange.max,
      },
    },
  });

  React.useEffect(() => {
    return form.subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        onFiltersChanged?.(values);
      },
    });
  }, [form, form.subscribe, onFiltersChanged]);

  return (
    <form id="filters">
      <FieldGroup className="gap-8">
        <Controller
          name="categories"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldGroup>
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend className="mb-3" variant="label">
                  Categories
                </FieldLegend>
                <FieldGroup
                  data-slot="checkbox-group"
                  className="grid grid-cols-2 md:grid-cols-1"
                >
                  {Object.entries(categoryMetadata).map(
                    ([category, { label, Icon }]) => (
                      <FieldLabel
                        key={`categories-${category}`}
                        className="font-normal"
                        htmlFor={`categories-${category}`}
                      >
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <FieldTitle>
                              <Icon className="size-4" />
                              {label}
                            </FieldTitle>
                          </FieldContent>
                          <Checkbox
                            id={`categories-${category}`}
                            name={field.name}
                            aria-invalid={fieldState.invalid}
                            checked={field.value.includes(category)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, category]
                                : field.value.filter(
                                    (value) => value !== category,
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        </Field>
                      </FieldLabel>
                    ),
                  )}
                </FieldGroup>
              </FieldSet>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldGroup>
          )}
        />

        <Controller
          name="technicalValueRange"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex w-full max-w-md flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="technicalValue-range">
                    Technical difficulty
                  </Label>
                  <span className="text-muted-foreground text-sm">
                    {field.value.min} - {field.value.max}
                  </span>
                </div>
                <Slider
                  id={`technicalValue-range`}
                  value={[field.value.min, field.value.max]}
                  onValueChange={(values) => {
                    if (!Array.isArray(values)) return;

                    field.onChange({ min: values[0], max: values[1] });
                  }}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  aria-label="Technical difficulty"
                />
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>0.1</span>
                  <span>1.0</span>
                </div>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
