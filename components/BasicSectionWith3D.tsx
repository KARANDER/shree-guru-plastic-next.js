import { motion, useInView } from 'framer-motion';
import React, { PropsWithChildren, useRef } from 'react';
import styled from 'styled-components';
import { media } from 'utils/media';
import Container from './Container';
import Model3D from './Model3D';
import OverTitle from './OverTitle';
import RichText from './RichText';

export interface BasicSectionWith3DProps {
  title: string;
  overTitle: string;
  reversed?: boolean;
  modelWidth?: string;
  modelHeight?: string;
}

export default function BasicSectionWith3D({ 
  title, 
  overTitle, 
  reversed, 
  modelWidth = "100%", 
  modelHeight = "400px",
  children 
}: PropsWithChildren<BasicSectionWith3DProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <BasicSectionWrapper ref={ref} reversed={reversed}>
      <ModelContainer
        as={motion.div}
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reversed ? 50 : -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Model3D width={modelWidth} height={modelHeight} />
      </ModelContainer>
      <ContentContainer
        as={motion.div}
        initial={{ opacity: 0, x: reversed ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reversed ? -50 : 50 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <CustomOverTitle
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {overTitle}
        </CustomOverTitle>
        <Title
          as={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {title}
        </Title>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <RichText>{children}</RichText>
        </motion.div>
      </ContentContainer>
    </BasicSectionWrapper>
  );
}

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const ModelContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media('<=desktop')} {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;

type Props = Pick<BasicSectionWith3DProps, 'reversed'>;
const BasicSectionWrapper = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: ${(p: Props) => (p.reversed ? 'row-reverse' : 'row')};

  ${ModelContainer} {
    margin: ${(p: Props) => (p.reversed ? '0 0 0 5rem' : '0 5rem 0 0')};
  }

  ${media('<=desktop')} {
    flex-direction: column;

    ${ModelContainer} {
      margin: 0 0 2.5rem 0;
    }
  }
`;
