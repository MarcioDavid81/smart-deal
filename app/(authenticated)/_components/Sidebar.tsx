"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaClipboardList, FaHardHat } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiGrainsFill } from "react-icons/pi";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "./Toggle-theme";
import { PanelRightOpen } from "lucide-react";

const routes = [
  {
    path: "/",
    name: "Início",
    icon: <FaHome size={20} />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    path: "/orders",
    name: "Pedidos",
    icon: <FaClipboardList size={20} />,
  },
  {
    path: "/customers",
    name: "Clientes",
    icon: <FaHandshakeSimple size={24} />,
  },
  {
    path: "/products",
    name: "Produtos",
    icon: <PiGrainsFill size={24} />,
  },
];


const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-50 text-primary  flex-col justify-between p-6 space-y-6 sticky top-0 min-h-screen transition-all duration-300 ease-in-out hidden md:flex dark:bg-primary dark:text-gray-50`}
    >
      <div className={`absolute -right-3 top-5 cursor-pointer rounded-full border-[3px] bg-primary p-1 text-secondary ${
          !isOpen && "rotate-180"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
      <PanelRightOpen className="h-6 w-6" />
      </div>
      
      <div>
        <div className="text-2xl font-bold border-b-2 pb-4 border-zinc-500">
          {isOpen ? (
            <Image 
              src="/logo2.png" 
              alt="Logo" 
              width={200} 
              height={50} 
              priority
            />
          ) : (
            <Image 
              src="/logo3.png" 
              alt="Logo" 
              width={500} 
              height={500} 
              priority
            />
          )}
        </div>
        
        <nav className="space-y-4 mt-4 flex flex-col border-b-2 border-zinc-500 pb-4">
          {routes.map((route) => (
            <TooltipProvider key={route.path} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Link
                      href={route.path}
                      className={`flex items-center p-2 rounded-lg hover:bg-hover hover:text-secondary ${
                        pathname === route.path ? "bg-secondary text-primary" : ""
                      }`}
                    >
                      {route.icon}
                      <span className={`ml-3 duration-300 ${!isOpen && "hidden"}`}>
                        {route.name}
                      </span>
                    </Link>
                  </div>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right" className="bg-hover text-gray-50">
                    {route.name}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div>
        <div className="flex flex-col items-center gap-4 font-bold border-b-2 pb-4 border-zinc-500">
          <ModeToggle />
        </div>
      </div>
      
      <div className="flex flex-col items-center p-1 rounded-md bg-zinc-800 dark:bg-transparent">
        <UserButton showName={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;