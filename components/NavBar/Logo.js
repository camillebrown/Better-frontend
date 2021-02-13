import React from "react";
import { Box, Link } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link href='/' fontSize="lg" fontWeight="bold">
        Logo
      </Link>
    </Box>
  )
}