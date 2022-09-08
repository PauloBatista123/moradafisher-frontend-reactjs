import { cloneElement, ReactElement } from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

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
      {cloneElement(children, {
        color: isActive ? 'blue.400' : 'gray.500'
      })}
    </NavLink>
  )
}