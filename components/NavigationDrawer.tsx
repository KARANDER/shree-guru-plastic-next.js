import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { NavItems } from 'types';
import ClientOnly from './ClientOnly';
import CloseIcon from './CloseIcon';
import OriginalDrawer from './Drawer';

type NavigationDrawerProps = PropsWithChildren<{ items: NavItems }>;

export default function NavigationDrawer({ children, items }: NavigationDrawerProps) {
  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <ClientOnly>
          <OriginalDrawer.Target openClass="drawer-opened" closedClass="drawer-closed">
            <div className="my-drawer">
              <div className="my-drawer-container">
                <DrawerCloseButton />
                <NavItemsList items={items} />
              </div>
            </div>
          </OriginalDrawer.Target>
        </ClientOnly>
      </Wrapper>
      {children}
    </OriginalDrawer.Drawer>
  );
}

function NavItemsList({ items }: NavigationDrawerProps) {
  const { close } = OriginalDrawer.useDrawer();
  const router = useRouter();

  useEffect(() => {
    function handleRouteChangeComplete() {
      close();
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete);
  }, [close, router]);

  return (
    <ul>
      {items.map((singleItem, idx) => {
        return (
          <NavItem key={idx}>
            <NextLink href={singleItem.href}>{singleItem.title}</NextLink>
          </NavItem>
        );
      })}
    </ul>
  );
}

function DrawerCloseButton() {
  const { close } = OriginalDrawer.useDrawer();
  return (
    <CloseIconContainer>
      <CloseIcon onClick={close} />
    </CloseIconContainer>
  );
}

const CloseIconContainer = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
`;

const Wrapper = styled.div`
  .my-drawer {
    height: 100vh;
    background: rgb(var(--modalBackground));
    color: rgb(var(--text));
    transition: margin 0.25s;
    z-index: 99999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .my-drawer-container {
    position: absolute;
    left: 2rem;
    right: 2rem;
    top: 2rem;
    bottom: 2rem;
  }

  .drawer-closed {
    margin-left: -100%;
  }

  .drawer-opened {
    margin-left: 0;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    & > *:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;

const NavItem = styled.li`
  a {
    font-size: 3rem;
    text-transform: uppercase;
    display: block;
    color: currentColor;
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    text-align: center;
  }
`;
