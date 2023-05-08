import { memo } from "react";
import { Box } from "@chakra-ui/react";
import { SideBarContainerProps } from "../../types/SideBarType";
import {
   SideBarAvatarHero,
   SideBarLogoSearch,
   SideBarNavigation,
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
