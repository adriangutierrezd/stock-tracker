import { AppSidebar } from '@/Components/app-sidebar';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import { PropsWithChildren, ReactNode } from 'react';
import { Toaster } from "@/Components/ui/toaster"

export default function Authenticated({ children, header }: PropsWithChildren<{ header?: ReactNode }>) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className='p-4 w-full'>
          <div className="flex justify-between mb-4">
            <SidebarTrigger />
            <ThemeToggle/>
          </div>
          {children}
          <Toaster />
        </main>
      </SidebarProvider>
    )
  }