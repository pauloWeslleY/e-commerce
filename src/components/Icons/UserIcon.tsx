import { memo } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const UserIcon = (props: IconProps) => (
   <Icon viewBox="0 0 200 200" {...props}>
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className="icon icon-tabler icon-tabler-user"
         width="200"
         height="200"
         viewBox="0 0 30 30"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
         <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
         <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
      </svg>
   </Icon>
);

export default memo(UserIcon);
