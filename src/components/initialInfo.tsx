import React from "react";
import { api } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { GitGraph } from "lucide-react";

const InitialInfo = () => {
  const { data, isLoading } = api.keto.getNamespaces.useQuery();
  return (
    <div className="flex w-[80%] items-center justify-start">
      <div className="flex items-start gap-2 rounded-md border p-4 shadow">
        <h3 className="flex scroll-m-20 items-center font-semibold tracking-tight">
          <GitGraph className="mr-2 h-4 w-4" />
          Namespace
        </h3>
        <Select defaultValue={data ? data.namespaces[0]?.name : undefined}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Namespace</SelectLabel>
              {!isLoading && data
                ? data.namespaces.map((n) => (
                    <SelectItem key={n.name} value={n.name}>
                      {n.name}
                    </SelectItem>
                  ))
                : null}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InitialInfo;
