import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Selectfield = () => {
  return (
    <Select>
      <SelectTrigger className="w-fit bg-background border-none font-bold text-foreground">
        <SelectValue placeholder="chat" className="font-bold text-sm" />
      </SelectTrigger>
      <SelectContent className="font-bold border-none bg-white">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Selectfield;
