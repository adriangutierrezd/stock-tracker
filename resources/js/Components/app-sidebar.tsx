import * as React from "react"
import { NavMain } from "@/Components/nav-main"
import { NavUser } from "@/Components/nav-user"
import { WalletSwitcher } from "@/Components/WalletSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar"
import { usePage } from "@inertiajs/react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = usePage().props.auth.user

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WalletSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
