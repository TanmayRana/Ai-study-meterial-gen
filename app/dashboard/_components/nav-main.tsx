/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({ items }: any) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuButton
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center cursor-pointer"
          tooltip="Create New"
          onClick={() => {
            router.push("/create");
          }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 ">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div
            className={`flex-1 ml-2 text-sm leading-tight truncate font-semibold text-white ${
              state === "collapsed" ? "hidden" : "block"
            }`}
          >
            Create New
          </div>
        </SidebarMenuButton>
        {items.map((item: any) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className={`group/collapsible rounded-lg py-1 hover:bg-slate-200 cursor-pointer ${
              pathname === item.url ? "bg-slate-200" : ""
            } ${state === "expanded" ? "py-3 " : "mt-3"}`}
            onClick={() => {
              router.push(item?.url);
            }}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                className="cursor-pointer hover:bg-transparent"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
