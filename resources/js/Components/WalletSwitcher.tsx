import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Wallet } from "@/types"
import { useActiveWalletStore } from "@/stores"

export function WalletSwitcher({
  wallets,
}: {
  wallets: Wallet[]}) {

  const { isMobile } = useSidebar()
  const {activeWallet, setActiveWallet } = useActiveWalletStore()

  React.useEffect(() => {
    if (!activeWallet && wallets.length > 0) {
      setActiveWallet(wallets[0])
    }
  }, [activeWallet, wallets, setActiveWallet])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {activeWallet ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <activeWallet.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeWallet.name}
                    </span>
                    <span className="truncate text-xs">{activeWallet.description}</span>
                  </div>
                </>
              ) : (
                // Render opcional o mensaje cuando activeWallet es null
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Selecciona una cartera</span>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Wallets
            </DropdownMenuLabel>
            {wallets.map((w) => (
              <DropdownMenuItem
                key={w.id}
                onClick={() => setActiveWallet(w)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <w.logo className="size-4 shrink-0" />
                </div>
                {w.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Nueva cartera</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
