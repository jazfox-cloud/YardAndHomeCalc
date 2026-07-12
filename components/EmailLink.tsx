"use client";

import { useEffect, useState } from "react";

const address = ["hello", "yardandhomecalc.com"].join("@");

export function EmailLink({ className }: { className?: string }) {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(`mailto:${address}`);
  }, []);

  return (
    <a className={className} href={href}>
      {address}
    </a>
  );
}
