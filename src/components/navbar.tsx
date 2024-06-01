import React from "react";
import { Network } from "lucide-react";
import { Badge } from "./ui/badge";
import { api } from "~/utils/api";
import { cn } from "~/lib/utils";

const Navbar = () => {
  const { data } = api.keto.status.useQuery();
  const live = data?.status === "ok";

  return (
    <nav className="h-14 w-full">
      <section className="mx-auto flex h-full w-[80%] items-center justify-between">
        <h3 className="flex scroll-m-20 items-center text-xl font-semibold tracking-tight text-white">
          <Network className="mr-2 h-5 w-5" />
          Keto Playground
        </h3>
        <div className="flex items-center gap-2 text-white">
          <h4 className="text-lg font-medium leading-none">Status</h4>
          <span>
            <Badge
              variant={"default"}
              className={cn(live ? "bg-green-500" : "bg-red-500")}
            >
              {live ? "Alive" : "Dead"}
            </Badge>
          </span>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
