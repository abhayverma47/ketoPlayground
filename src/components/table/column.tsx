"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { AsteriskIcon, MoreHorizontal, Workflow, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Relation = {
  namespace: string;
  object: string;
  relation: string;
  subject_id: string;
  subject_set: {
    namespace: string;
    object: string;
    relation: string;
  };
};

export const columns: ColumnDef<Relation>[] = [
  {
    accessorKey: "object",
    header: "Object",
  },
  {
    accessorKey: "relation",
    header: () => <div className="max-w-[180px]">Relation</div>,
  },
  {
    accessorKey: "subject_id",
    header: "Subject",
    cell: ({ row }) => {
      const subjectId = row.getValue("subject_id");
      return subjectId ? (
        subjectId
      ) : (
        <Workflow className="h-4 w-4 text-gray-600" />
      );
    },
  },
  {
    accessorKey: "subject_set",
    header: () => <div className="text-right">Sub Subject</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const subjectSet = row.getValue("subject_set") as
        | Relation["subject_set"]
        | undefined;
      return subjectSet ? (
        <p className="text-right text-xs font-light text-gray-400">
          RE:{" "}
          <span className="text-sm font-normal text-white">
            {subjectSet.relation || ""}
          </span>{" "}
          | OB:{" "}
          <span className="text-sm font-normal text-white">
            {subjectSet.object || ""}
          </span>
        </p>
      ) : (
        <AsteriskIcon className="ml-auto h-4 w-4 text-gray-600" />
      );
    },
  },
  {
    id: "actions",
    size: 10,
    cell: ({ row }) => {
      const Relation = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      const { mutateAsync } = api.keto.deleteRelation.useMutation();
      const { refetch } = api.keto.getAllRelations.useQuery({
        namespace: "maintain",
      });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      const handler = async () => {
        await mutateAsync(
          {
            namespace: Relation.namespace,
            object: Relation.object,
            relation: Relation.relation,
            subject: Relation.subject_id || undefined,
            sub_object: Relation.subject_set?.object,
            sub_relation: Relation.subject_set?.relation,
          },
          {
            async onSuccess() {
              await refetch();
              toast({
                title: "Relation Deleted",
                description: `Relation ${Relation.relation} deleted successfully`,
                duration: 5000,
              });
            },
          },
        );
      };
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-auto h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                Edit relation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handler()}
                className="cursor-pointer text-red-600 hover:bg-red-300 hover:text-red-100"
              >
                Delete Relation
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="flex-row items-center justify-between">
                <DialogTitle>Edit profile</DialogTitle>
                <DialogClose onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </DialogClose>
              </DialogHeader>
              <div className="grid gap-4 py-4">kk</div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
