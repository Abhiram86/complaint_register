import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

export function RadioList({
  control,
  name,
  data,
}: {
  control: any;
  name: string;
  data: string[];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          className="flex"
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          {data.map((item, index) => (
            <div className="flex items-center gap-3" key={index}>
              <RadioGroupItem value={item} id={item} />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
