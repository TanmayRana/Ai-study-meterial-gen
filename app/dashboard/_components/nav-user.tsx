/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import {
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   CreditCard,
//   LogOut,
//   Sparkles,
// } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
// import { BsCreditCardFill } from "react-icons/bs";

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   const { isMobile } = useSidebar();

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
//             >
//               <BsCreditCardFill />
//               <div className="">
//                 <h2 className="text-lg mb-2">Available Credits: 5</h2>
//                 <Progress value={50} />
//                 <h2 className="text-sm">1 out of 5</h2>
//                 <Link href={"/"} className="text-blue-500 text-xs mt-3">
//                   Upgrade to create more
//                 </Link>
//               </div>
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//             side={isMobile ? "bottom" : "right"}
//             align="end"
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   <AvatarImage src={user.avatar} alt={user.name} />
//                   <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-semibold">{user.name}</span>
//                   <span className="truncate text-xs">{user.email}</span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <Link href={"/"} className="text-blue-500 text-xs mt-3">
//                 <DropdownMenuItem>
//                   <Sparkles />
//                   Upgrade to create more
//                 </DropdownMenuItem>
//               </Link>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

// "use client";

// import {
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   CreditCard,
//   LogOut,
//   Sparkles,
// } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
// import { BsCreditCardFill } from "react-icons/bs";

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   const { isMobile } = useSidebar();
//   console.log(isMobile, "isMobile");

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem className="p-3 border-t shadow-sm rounded-lg">
//         <div className="hidden data-[state=closed]:block">
//           <BsCreditCardFill className="text-xl text-blue-600 " />
//         </div>
//         <div className="leading-tight truncate ">
//           <h2 className="text-lg mb-2">Available Credits: 5</h2>
//           <Progress value={50} />
//           <h2 className="text-sm">1 out of 5</h2>
//           <Link href={"/"} className="text-blue-500 text-xs mt-3">
//             Upgrade to create more
//           </Link>
//         </div>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

// "use client";

// import { Sparkles } from "lucide-react";
// import { BsCreditCardFill } from "react-icons/bs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   const { isMobile } = useSidebar();

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           {/* <DropdownMenuTrigger asChild> */}
//           <SidebarMenuButton
//             size="lg"
//             className="flex flex-col items-start gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
//           >
//             <div className="flex items-center  gap-2 ">
//               <BsCreditCardFill className="text-xl text-blue-600" />
//               <h2 className="text-lg mb-2">Available Credits: 5</h2>
//               <Progress value={50} />
//               <h2 className="text-sm">1 out of 5</h2>
//               <Link href={"/"} className="text-blue-500 text-xs mt-3">
//                 Upgrade to create more
//               </Link>
//             </div>
//             {/* <div className=" w-full text-xs text-muted-foreground ">
//                 <h2 className="text-sm font-semibold text-muted-foreground">
//                   Available Credits: <span className="text-black">5</span>
//                 </h2>
//                 <Progress value={50} className="w-full h-2" />
//                 <span>1 out of 5 used</span>
//                 <Link href="/" className="text-blue-500 hover:underline">
//                   Upgrade
//                 </Link>
//               </div> */}
//           </SidebarMenuButton>
//           {/* </DropdownMenuTrigger> */}
//           <DropdownMenuContent
//             className="min-w-64 rounded-lg"
//             side={isMobile ? "bottom" : "right"}
//             align="end"
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-3 px-3 py-3">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   <AvatarImage src={user.avatar} alt={user.name} />
//                   <AvatarFallback className="rounded-lg">
//                     {user.name?.[0]?.toUpperCase() ?? "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="text-sm font-semibold">{user.name}</span>
//                   <span className="text-xs text-muted-foreground">
//                     {user.email}
//                   </span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem asChild>
//                 <Link href="/" className="flex items-center gap-2 w-full">
//                   <Sparkles className="w-4 h-4 text-blue-500" />
//                   <span className="text-sm font-medium text-blue-500">
//                     Upgrade to create more
//                   </span>
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

// "use client";

// import {
//   SidebarMenu,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
// import { BsCreditCardFill } from "react-icons/bs";
// import { useContext } from "react";
// import { ConrseCountContext } from "@/app/_context/ConrseCountContext";

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   const { isMobile, state } = useSidebar();

//   // console.log(state, "state");

//   const { totalCourse, setTotalCourse } = useContext(ConrseCountContext);

//   return (
//     <SidebarMenu
//       className={`p-3   rounded-lg ${
//         state === "expanded" ? "shadow-sm border-t" : ""
//       }`}
//     >
//       <SidebarMenuItem>
//         <div className={`${state === "expanded" ? "hidden" : "block "}`}>
//           <BsCreditCardFill className="text-xl text-blue-600 w-4 h-4" />
//         </div>
//         <div className={`${state === "collapsed" ? "hidden" : "block"}`}>
//           <h2 className="text-lg mb-2">Available Credits: {5 - totalCourse}</h2>
//           <Progress value={(totalCourse / 5) * 100} />
//           <h2 className="text-sm">{totalCourse} out of 5</h2>
//           <Link href={"/"} className="text-blue-500 text-xs mt-3">
//             Upgrade to create more
//           </Link>
//         </div>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BsCreditCardFill } from "react-icons/bs";
import { useContext } from "react";
import { ConrseCountContext } from "@/app/_context/ConrseCountContext";

interface UserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function NavUser({ user }: UserProps) {
  const { isMobile, state } = useSidebar();

  const context = useContext(ConrseCountContext);
  if (!context) {
    throw new Error(
      "NavUser must be used within a ConrseCountContext.Provider"
    );
  }

  const { totalCourse } = context;

  return (
    <SidebarMenu
      className={`p-3 rounded-lg ${
        state === "expanded" ? "shadow-sm border-t" : ""
      }`}
    >
      <SidebarMenuItem>
        <div className={`${state === "expanded" ? "hidden" : "block "}`}>
          <BsCreditCardFill className="text-xl text-blue-600 w-4 h-4" />
        </div>
        <div className={`${state === "collapsed" ? "hidden" : "block"}`}>
          <h2 className="text-lg mb-2">Available Credits: {5 - totalCourse}</h2>
          <Progress value={(totalCourse / 5) * 100} />
          <h2 className="text-sm">{totalCourse} out of 5</h2>
          <Link href="/" className="text-blue-500 text-xs mt-3">
            Upgrade to create more
          </Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
