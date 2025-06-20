"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { SUPPORTED_CUISINES } from "@/constants/supported-cuisines";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { mainRoutes } from "@/constants/routes";

export default function SearchFormSection() {
  const form = useForm({
    defaultValues: {
      query: "",
      cuisine: "",
      maxReadyTime: "",
    },
    resolver: zodResolver(
      z
        .object({
          query: z.string(),
          cuisine: z.string(),
          maxReadyTime: z.string(),
        })
        .refine((data) => data.query || data.cuisine || data.maxReadyTime, {
          message: "At least one field must be filled",
        }),
    ),
  });

  return (
    <Form action={mainRoutes.recipes} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter a query"
            className="grow"
            {...form.register("query")}
            aria-invalid={form.formState.errors.query ? "true" : "false"}
          />
          <Select
            value={form.watch("cuisine")}
            onValueChange={(value) =>
              form.setValue("cuisine", value, {
                shouldValidate: true,
                shouldTouch: true,
              })
            }
            name="cuisine"
          >
            <SelectTrigger className="shrink-0">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_CUISINES.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Max prep time in mins"
          type="number"
          min={1}
          {...form.register("maxReadyTime")}
        />
      </div>
      <div className="h-px w-full bg-border" />
      <Button type="submit" disabled={!form.formState.isValid}>
        Next
      </Button>
    </Form>
  );
}
