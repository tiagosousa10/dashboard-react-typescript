import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Content = ({ children }: Props) => {
  return (
    <div className="text-foreground bg-background p-6 lg:p-8 h-[calc(100vh-70px)] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-muted">
      <div className="ml-64 max-w-5xl mx-auto">{children}</div>
    </div>
  );
};

export default Content;
