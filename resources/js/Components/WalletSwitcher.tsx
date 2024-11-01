import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/Components/ui/sidebar"
import { Wallet, WalletIconType } from "@/types"
import { useActiveWalletStore } from "@/stores"
import { WALLET_ICON_CONVERSION } from "@/constants"

import { Button } from "@/Components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "./ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"


export function WalletSwitcher({
  wallets,
}: {
  readonly wallets: Wallet[]
}) {

  const { isMobile } = useSidebar()
  const { activeWallet, setActiveWallet } = useActiveWalletStore()

  React.useEffect(() => {
    if (!activeWallet && wallets.length > 0) {
      setActiveWallet(wallets[0])
    }
  }, [activeWallet, wallets, setActiveWallet])

  const ActiveIconComponent = activeWallet ? WALLET_ICON_CONVERSION[activeWallet.logo as WalletIconType] : null;

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
                    {ActiveIconComponent && (
                      <ActiveIconComponent className='h-4 w-4' />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeWallet.name}
                    </span>
                    <span className="truncate text-xs">{activeWallet.description}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </>
              ) : (
                // Render opcional o mensaje cuando activeWallet es null
                <div className="flex justify-between items-center w-full">
                  <span className="truncate font-semibold">Selecciona una cartera</span>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
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
            {wallets.map((wallet: Wallet) => {
              const WalletIcon = WALLET_ICON_CONVERSION[wallet.logo as WalletIconType]
              return (
                <DropdownMenuItem
                  key={wallet.id}
                  onClick={() => setActiveWallet(wallet)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <WalletIcon className="size-4 shrink-0" />
                  </div>
                  {wallet.name}
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <DialogDemo />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const DialogDemo = () => {

  const formSchema = z.object({
    name: z.string().min(2).max(15),
    description: z.string().optional(),
    logo: z.string().min(2).max(15)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      logo: 'GROWING'
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex items-center">
          <Plus className="size-4" />
          Nueva cartera
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalles de la cartera</DialogTitle>
          <DialogDescription>
            Puedes crear una nueva cartera de inversión independiente de las que ya tienes registradas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="self-end">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-[30px]">
                        {Object.keys(WALLET_ICON_CONVERSION).map((key) => {
                          const Icon = WALLET_ICON_CONVERSION[key as WalletIconType]
                          return (
                            <SelectItem key={key} value={key}>
                              <Icon className="h-4 w-4" />
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}