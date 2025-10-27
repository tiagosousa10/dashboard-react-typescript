import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IMessageBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

const MessageBox = ({
  title,
  description,
  footerText,
  icon,
}: IMessageBoxProps) => {
  return (
    <Card className="w-full  h-[260px] bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-medium animate-slide-up">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-bold">
          {title}
          <img src={icon} alt={title} className="w-8 h-8 ml-2" />
        </CardTitle>
        <p className="text-lg text-white/90">{description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <span className="text-sm text-white/80">{footerText}</span>
      </CardContent>
    </Card>
  );
};

export default MessageBox;
