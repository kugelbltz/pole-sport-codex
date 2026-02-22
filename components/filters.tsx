import { elementCategories } from "@/lib/elements";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
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
      <FieldGroup>
        <Controller
          name="categories"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldGroup>
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label">Categories</FieldLegend>
                <FieldGroup data-slot="checkbox-group">
                  {Object.entries(elementCategories).map(
                    ([category, { label }]) => (
                      <Field
                        key={`categories-${category}`}
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
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
                        <FieldLabel
                          htmlFor={`categories-${category}`}
                          className="font-normal"
                        >
                          {label}
                        </FieldLabel>
                      </Field>
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
              <FieldTitle>Technical difficulty</FieldTitle>
              <div className="flex gap-2 items-center text-muted-foreground text-sm font-medium">
                <span>{field.value.min}</span>
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
                <span>{field.value.max}</span>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
