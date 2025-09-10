import { motion, useScroll, useTransform } from 'framer-motion';
import NextLink from 'next/link';
import { useRef } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import HeroIllustration from 'components/HeroIllustation';
import OverTitle from 'components/OverTitle';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { media } from 'utils/media';

export default function Hero() {
  const { setIsModalOpened } = useNewsletterModalContext();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <HeroWrapper ref={heroRef}>
      <Contents
        as={motion.div}
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CustomOverTitle
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          precision engineering for modern manufacturing
        </CustomOverTitle>
        <Heading
          as={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Powering Modern Industry with <HighlightText>High-Performance Electroplating</HighlightText> Machines
        </Heading>
        <Description
          as={motion.p}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Shree Guru Plastic delivers durable, efficient and customized machines trusted by top manufacturers.
        </Description>
        <CustomButtonGroup
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button onClick={() => setIsModalOpened(true)}>
           

             Explore Machinesr <span>&rarr;</span>
          </Button>
          <NextLink href="#whitepaper" passHref>
            <Button transparent>
              Download Brochure <span>&rarr;</span>
            </Button>
          </NextLink>
        </CustomButtonGroup>
      </Contents>
      <ImageMotionContainer
        style={{ y: imageY }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <HeroIllustration />
      </ImageMotionContainer>
    </HeroWrapper>
  );
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 5rem;

  ${media('<=desktop')} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`;

const ImageMotionContainer = styled(motion.div)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    max-width: 45rem;
  }

  ${media('<=desktop')} {
    margin-top: 2rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media('<=desktop')} {
    font-size: 1.5rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 5.2rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }
`;

const HighlightText = styled.span`
  background: linear-gradient(135deg, #2563eb 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
`;
