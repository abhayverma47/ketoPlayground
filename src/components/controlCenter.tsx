import React from "react";
import Register from "./register";
import Verify from "./verify";
import { Bolt } from "lucide-react";

const ControlCenter = () => {
  return (
    <section className="mx-auto mb-4 flex w-[80%] flex-col justify-center gap-4 ">
      <div className="flex justify-start gap-6">
        <Register />
        <Verify />
      </div>
    </section>
  );
};

export default ControlCenter;
