import React, { ReactNode } from "react";

interface IContentHeaderProps {
  title: string;
  lineColor: string;
  children: ReactNode;
}

const ContentHeader = ({ title, lineColor, children }: IContentHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <div
            className="h-1 rounded-full mt-2"
            style={{
              width: "60px",
              backgroundColor: lineColor,
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};

export default ContentHeader;
