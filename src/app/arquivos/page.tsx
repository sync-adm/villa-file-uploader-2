import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import FilestashIframe from "@/components/filestash_iframe";
import { getServerSession } from "@/lib/auth-server";

export default async function Page() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  const isAdmin = userEmail === "adm@villaveiculos.com.br";
  const instance = isAdmin
    ? process.env.FILESTASH_ADM_INSTANCE ??
      process.env.FILESTASH_USER_INSTANCE ??
      "/"
    : process.env.FILESTASH_USER_INSTANCE ?? "/";

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="">
          {" "}
          {/* <UploadVehicleDocuments /> */}
          <FilestashIframe instance={instance} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
