import { useState } from "react";
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";
import { Menu } from "lucide-react";
import logoImg from "../../assets/logo.svg";
import Toggle from "../Toggle";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const menuItems = [
    {
      icon: MdDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: MdArrowUpward,
      label: "Entradas",
      href: "/list/entry-balance",
    },
    {
      icon: MdArrowDownward,
      label: "Saídas",
      href: "/list/exit-balance",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen lg:flex flex-col w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <div className="flex items-center h-16 px-6 border-b border-slate-200 dark:border-slate-700">
          <img src={logoImg} alt="logoDaMinhaCarteira" className="h-8 w-8" />
          <h3 className="text-slate-800 dark:text-slate-200 ml-3 font-semibold text-lg">
            Carteira
          </h3>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 ">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <IconComponent className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            onClick={signOut}
            variant="ghost"
            className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
          >
            <MdExitToApp className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Toggle
            labelLeft="Light"
            labelRight="Dark"
            checked={darkTheme}
            onChange={handleChangeTheme}
          />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center">
                  <img
                    src={logoImg}
                    alt="logoDaMinhaCarteira"
                    className="h-8 w-8"
                  />
                  <SheetTitle className="text-slate-800 dark:text-slate-200 ml-3">
                    Carteira
                  </SheetTitle>
                </div>
                <SheetDescription>
                  Gerencie suas finanças pessoais
                </SheetDescription>
              </SheetHeader>

              <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
                <Button
                  onClick={signOut}
                  variant="ghost"
                  className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                >
                  <MdExitToApp className="h-5 w-5 mr-3" />
                  Sair
                </Button>

                <div className="flex justify-center">
                  <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                  />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Aside;
