import React from "react";
import { Box, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <div>
      <Link href='/' textDecoration="none" className="logo">
        better<span className="logo-dot">.</span>
      </Link>
    </div>
  )
}