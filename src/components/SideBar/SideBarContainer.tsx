import { memo } from "react";
import { Box } from "@chakra-ui/react";
import {
   SideBarAvatarHero,
   SideBarLogoSearch,
   SideBarNavigation,
   SideBarContainerProps,
} from "./index";

function SideBarContainer({ collapsed }: SideBarContainerProps) {
   return (
      <>
         <Box w={"full"}>
            <SideBarLogoSearch collapsed={collapsed} />

            <SideBarNavigation collapsed={collapsed} />
         </Box>
         <SideBarAvatarHero collapsed={collapsed} />
      </>
   );
}

export default memo(SideBarContainer);
