import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { Controller } from "react-hook-form";

interface SelectListProps extends SelectProps {
  title: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  data: string[];
}

export function SelectList({
  title,
  data,
  name,
  control,
  ...props
}: SelectListProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          {...props}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select a ${title.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{title}</SelectLabel>
              {data.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
