"use client"
import {
  Activity,
  Bot,
  LayoutDashboard,
  Wallet,
} from "lucide-react"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar"
import { Link } from "@inertiajs/react"

type SidebarSingleItem = {
  title: string
  url: string
  type: 'SINGLE'
  icon?: LucideIcon
  isActive?: boolean
}

type SidebarGroupItem = {
  title: string
  url: string
  type: 'GROUP'
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

type SidebarItem = SidebarSingleItem | SidebarGroupItem

const items: SidebarItem[] = [
  {
    type: 'SINGLE',
    title: 'Dashboard',
    url: route('dashboard'),
    icon: LayoutDashboard
  },
  {
    type: 'SINGLE',
    title: 'Wallets',
    url: route('wallets.index'),
    icon: Wallet
  },
  {
    type: 'SINGLE',
    title: 'Trades',
    url: route('trades.index'),
    icon: Activity
  },
  // {
  //   type: 'GROUP',
  //   title: "Models",
  //   url: "#",
  //   icon: Bot,
  //   items: [
  //     {
  //       title: "Genesis",
  //       url: "#",
  //     },
  //     {
  //       title: "Explorer",
  //       url: "#",
  //     },
  //     {
  //       title: "Quantum",
  //       url: "#",
  //     },
  //   ],
  // }
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <>
            {item.type == 'SINGLE' ? (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
