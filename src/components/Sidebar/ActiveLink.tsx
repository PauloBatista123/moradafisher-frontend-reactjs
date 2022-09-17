import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import { cloneElement, ReactElement } from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import styles from './styles.module.css';

interface ActiveLinksProps extends NavLinkProps{
  children: ReactElement;
  souldMatchExactHref?: boolean;
}

export function ActiveLink({children, souldMatchExactHref = false, ...rest}: ActiveLinksProps){
  const {pathname} = useLocation();

  let isActive = false;

  if(souldMatchExactHref &&(pathname === rest.to)){
    isActive = true;
  }

  if(!souldMatchExactHref &&
    ( 
      pathname.startsWith(String(rest.to))
    )
  ){
    isActive = true;
  }

  return (
    <NavLink {...rest}>
      <LinkBox 
        borderBottom={"2px solid transparent"}
        transitionProperty="border-bottom"
        transitionDuration={"0.2s"}
        transitionTimingFunction={"ease-in"}
        sx={{
          '&:hover': {
            borderBottom: '2px solid',
            borderColor: 'gray.200'
          }
        }}>
        <LinkOverlay >
        {cloneElement(children, {
          color: isActive ? 'blue.400' : 'gray.500'
        })}
        </LinkOverlay>
      </LinkBox>
    </NavLink>
  )
}