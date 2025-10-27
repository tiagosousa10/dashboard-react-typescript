import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  onChange: (value: string) => void;
  defaultValue?: string | number;
}

const SelectInput = ({
  options,
  onChange,
  defaultValue,
}: ISelectInputProps) => {
  return (
    <div className="ml-2">
      <Select onValueChange={onChange} defaultValue={String(defaultValue)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
