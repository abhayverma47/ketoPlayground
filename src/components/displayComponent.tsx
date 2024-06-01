import {
  AsteriskIcon,
  Cable,
  PlusCircle,
  RotateCcw,
  ShieldCheck,
  ShieldEllipsis,
  Table2,
  TowerControl,
  Workflow,
} from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { api } from "~/utils/api";
import { Skeleton } from "./ui/skeleton";
import { cn } from "~/lib/utils";
import Register from "./register";
import Verify from "./verify";
import { DataTable } from "./table/data-table";
import { columns } from "./table/column";
import Controls from "./controls";

const DisplayComponent = () => {
  const { data, isLoading, refetch, isRefetching } =
    api.keto.getAllRelations.useQuery({
      namespace: "maintain",
    });
  console.log(data);
  return (
    <section className="mx-auto flex w-[80%]">
      <div className="flex w-full flex-col gap-4 rounded-md border p-4 shadow">
        <h3 className="flex scroll-m-20 items-center font-semibold tracking-tight">
          <Table2 className="mr-2 h-4 w-4" />
          Relations Tuples
          <Dialog>
            <DialogTrigger asChild title="Verify Relation">
              <TowerControl className="ml-6 h-4 w-4 cursor-pointer text-pink-600" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <TowerControl className="mr-2 h-4 w-4" />
                  Control Tower
                </DialogTitle>
              </DialogHeader>
              <Controls />
            </DialogContent>
          </Dialog>
          <div className="ml-auto flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild title="Verify Relation">
                <ShieldCheck className="h-4 w-4 cursor-pointer text-indigo-500 transition-all duration-150 hover:text-teal-400" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ShieldEllipsis className="mr-2 h-4 w-4" />
                    Verify Relation
                  </DialogTitle>
                </DialogHeader>
                <Verify />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <PlusCircle className="h-4 w-4 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Cable className="mr-2 h-4 w-4" />
                    Create Relation
                  </DialogTitle>
                </DialogHeader>
                <Register />
              </DialogContent>
            </Dialog>
            <RotateCcw
              onClick={() => refetch()}
              className={cn(
                "h-4 w-4 -scale-100 cursor-pointer text-gray-500 hover:text-white active:text-white",
                isRefetching && "animate-spin",
              )}
            />
          </div>
        </h3>
        <DataTable data={data?.data ?? []} columns={columns} />
      </div>
    </section>
  );
};

export default DisplayComponent;
