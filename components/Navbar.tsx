import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { ScrollPositionEffectProps, useScrollPosition } from 'hooks/useScrollPosition';
import { NavItems, SingleNavItem } from 'types';
import { media } from 'utils/media';
import Button from './Button';
import Container from './Container';
import Drawer from './Drawer';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle } = Drawer.useDrawer();
  const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>('none');

  let lastScrollY = useRef(0);
  const lastRoute = useRef('');
  const stepSize = useRef(50);

  useScrollPosition(scrollPositionCallback, [router.asPath], undefined, undefined, 50);

  function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
    const routerPath = router.asPath;
    const hasRouteChanged = routerPath !== lastRoute.current;

    if (hasRouteChanged) {
      lastRoute.current = routerPath;
      setScrollingDirection('none');
      return;
    }

    const currentScrollY = currPos.y;
    const isScrollingUp = currentScrollY > lastScrollY.current;
    const scrollDifference = Math.abs(lastScrollY.current - currentScrollY);
    const hasScrolledWholeStep = scrollDifference >= stepSize.current;
    const isInNonCollapsibleArea = lastScrollY.current > -50;

    if (isInNonCollapsibleArea) {
      setScrollingDirection('none');
      lastScrollY.current = currentScrollY;
      return;
    }

    if (!hasScrolledWholeStep) {
      lastScrollY.current = currentScrollY;
      return;
    }

    setScrollingDirection(isScrollingUp ? 'up' : 'down');
    lastScrollY.current = currentScrollY;
  }

  const isNavbarHidden = scrollingDirection === 'down';
  const isTransparent = scrollingDirection === 'none';

  return (
    <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
      <Content>
        <NextLink href="/" passHref>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </NextLink>
        <NavItemList>
          {items.map((singleItem) => (
            <NavItem key={singleItem.href} {...singleItem} />
          ))}
        </NavItemList>
        <ColorSwitcherContainer>
          <ColorSwitcher />
        </ColorSwitcherContainer>
        <HamburgerMenuWrapper>
          <HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </NavbarContainer>
  );
}

function NavItem({ href, title, outlined, dropdown }: SingleNavItem) {
  const { setIsModalOpened } = useNewsletterModalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function showNewsletterModal() {
    setIsModalOpened(true);
  }

  if (outlined) {
    return <CustomButton onClick={showNewsletterModal}>{title}</CustomButton>;
  }

  if (dropdown) {
    return (
      <DropdownContainer
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <NavItemWrapper outlined={outlined}>
          <NextLink href={href} passHref>
            <a>
              {title}
              <DropdownArrow isOpen={isDropdownOpen}>▼</DropdownArrow>
            </a>
          </NextLink>
        </NavItemWrapper>
        <DropdownMenu isOpen={isDropdownOpen}>
          {dropdown.map((item) => (
            <DropdownMenuItem key={item.href}>
              <NextLink href={item.href} passHref>
                <DropdownLink>
                  <DropdownTitle>{item.title}</DropdownTitle>
                  {item.description && (
                    <DropdownDescription>{item.description}</DropdownDescription>
                  )}
                </DropdownLink>
              </NextLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </DropdownContainer>
    );
  }

  return (
    <NavItemWrapper outlined={outlined}>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </NavItemWrapper>
  );
}

const CustomButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  line-height: 1.8;
`;

const NavItemList = styled.div`
  display: flex;
  list-style: none;

  ${media('<desktop')} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  ${media('>=desktop')} {
    display: none;
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;

  color: rgb(var(--logoColor));
`;

const NavItemWrapper = styled.li<Partial<SingleNavItem>>`
  background-color: ${(p) => (p.outlined ? 'rgb(var(--primary))' : 'transparent')};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  &:hover {
    background-color: ${(p) => (p.outlined ? 'rgb(var(--primary), 0.8)' : 'transparent')};
    transition: background-color 0.2s;
  }

  a {
    display: flex;
    color: ${(p) => (p.outlined ? 'rgb(var(--textSecondary))' : 'rgb(var(--text), 0.75)')};
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownArrow = styled.span<{ isOpen: boolean }>`
  margin-left: 0.5rem;
  font-size: 0.8em;
  transform: ${(p) => (p.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  background: rgb(var(--background));
  border: 1px solid rgb(var(--border));
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: ${(p) => (p.isOpen ? 1 : 0)};
  visibility: ${(p) => (p.isOpen ? 'visible' : 'hidden')};
  transform: ${(p) => (p.isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.2s ease;
  z-index: 1000;
  padding: 1rem 0;

  ${media('<desktop')} {
    display: none;
  }
`;

const DropdownMenuItem = styled.div`
  padding: 0;
  margin: 0;
`;

const DropdownLink = styled.a`
  display: block !important;
  padding: 1rem 1.5rem !important;
  text-decoration: none;
  color: rgb(var(--text)) !important;
  font-weight: 500 !important;
  text-transform: none !important;
  line-height: 1.4 !important;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgb(var(--primary), 0.1), rgb(var(--primary), 0.2));
    transition: width 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    color: rgb(var(--primary)) !important;
    
    &::before {
      width: 100%;
    }
  }
`;

const DropdownTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
  color: rgb(var(--text));
`;

const DropdownDescription = styled.div`
  font-size: 1.2rem;
  color: rgb(var(--textSecondary));
  font-weight: 400;
`;

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);

  background-color: rgb(var(--navbarBackground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  visibility: ${(p) => (p.hidden ? 'hidden' : 'visible')};
  transform: ${(p) => (p.hidden ? `translateY(-8rem) translateZ(0) scale(1)` : 'translateY(0) translateZ(0) scale(1)')};

  transition-property: transform, visibility, height, box-shadow, background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ColorSwitcherContainer = styled.div`
  width: 4rem;
  margin: 0 1rem;
`;
