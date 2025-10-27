import React, { useMemo } from "react";
import emojis from "../../utils/emojis";

const MainHeader: React.FC = () => {
  //gerar um emoji aleatorio
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  return (
    <div className="bg-card border-b border-border flex justify items-center px-6 py-2 shadow-soft lg:px-8">
      <div className="text-foreground">
        <div className="text-sm text-muted-foreground">Olá, {emoji}</div>
        <div className="font-semibold">Tiago Sousa</div>
      </div>
    </div>
  );
};

export default MainHeader;
