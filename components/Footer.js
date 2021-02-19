import React from "react";
import { Divider, Text } from "@chakra-ui/react"


export default function Footer() {
  return (
    <div className="footer">
      <Divider margin="0 auto" width="80%" marginBottom="25px"/>
      <Text fontFamily='Boing' className="logo">
        b<span className="logo-dot">.</span>
      </Text>
      <p lineheight="1.2">
        © Better. Copyright 2021 <br></br>Made with love by Camille Brown in Los Angeles, CA.
      </p>
    </div>
  )
}