import { Icon, Link as ChakraLink, LinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "./ActiveLink";

interface NavLinkProps extends LinkProps{
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({icon, children, href,...rest}: NavLinkProps){
  return (
    <ActiveLink to={href}>
      <ChakraLink
        className="nav-link-sidebar"
        as={'button'}
        display="flex"
        alignItems="center"
        {...rest}
        >
        <Icon 
        as={icon} fontSize="20"
        />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}