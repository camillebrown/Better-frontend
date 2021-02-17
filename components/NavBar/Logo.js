import React from "react";
import { Box, Link } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link href='/' className="logo">
        better<span className="logo-dot">.</span>
      </Link>
    </Box>
  )
}