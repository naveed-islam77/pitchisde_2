import { cn } from "@/lib/utils";
import React from "react";

const CardBadge = ({
  className,
  title,
}: {
  className?: string;
  title: string;
}) => {
  return (
    <div className={cn("abosolute -top-10 left-[50%]", className)}>{title}</div>
  );
};

export default CardBadge;
