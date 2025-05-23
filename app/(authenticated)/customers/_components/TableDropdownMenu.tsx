import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {
    ClipboardCopyIcon,
    EditIcon,
    MoreHorizontalIcon,
    Trash2Icon,
  } from "lucide-react";
  
  const OrdersTableDropdownMenu = (order: any) => {
    return (
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-primary">
            <DropdownMenuLabel>Ações em Pedidos</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-1.5">
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
  
            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Editar Pedido
            </DropdownMenuItem>
  
            <AlertDialogTrigger>
              <DropdownMenuItem className="gap-1.5">
                <Trash2Icon size={16} />
                Excluir Pedido
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente excluir esta entrada?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default OrdersTableDropdownMenu;
  