import React from "react";
import Switch from "react-switch";

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toggle = ({ labelLeft, labelRight, checked, onChange }: IToggleProps) => (
  <div className="flex items-center">
    <span className="text-foreground">{labelLeft}</span>
    <Switch
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChange}
      onColor="#134074"
      offColor="#8da9c4"
      className="mx-1.5"
    />
    <span className="text-foreground">{labelRight}</span>
  </div>
);

export default Toggle;
