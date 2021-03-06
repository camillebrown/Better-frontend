import React from "react";
import { Box, Link } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link href='/' textDecoration="none" className="logo">
        better<span className="logo-dot">.</span>
      </Link>
    </Box>
  )
}