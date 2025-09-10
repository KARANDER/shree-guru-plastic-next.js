import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Container from 'components/Container';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-1.svg',
    title: 'Chemical-Resistant PP/PVC Tanks',
    description:
      'Durable polypropylene and PVC construction ensures long-lasting performance and resistance to harsh electroplating chemicals.',
  },
  {
    imageUrl: '/grid-icons/asset-2.svg',
    title: 'Tailored to Your Specifications',
    description:
      'Custom tank sizes, capacities, and configurations designed specifically for your production requirements and space constraints.',
  },
  {
    imageUrl: '/grid-icons/asset-3.svg',
    title: 'Chrome, Nickel, Gold & Zinc Plating',
    description:
      'Versatile systems supporting decorative chrome, bright nickel, precious metal, and anti-corrosion zinc plating applications.',
  },
  {
    imageUrl: '/grid-icons/asset-4.svg',
    title: 'Superior Filtration Systems',
    description:
      'Cartridge, bag, and ultra-filtration options ensure clean solutions and consistent plating quality for superior finishes.',
  },
  {
    imageUrl: '/grid-icons/asset-5.svg',
    title: 'Centrifugal & Hot Air Dryers',
    description:
      'Energy-efficient drying systems for post-plating processing, reducing cycle times and improving productivity.',
  },
  {
    imageUrl: '/grid-icons/asset-6.svg',
    title: 'Automotive to Jewelry Applications',
    description:
      'Serving diverse industries from automotive parts and hardware to electronics and precious jewelry with specialized solutions.',
  },
  {
    imageUrl: '/grid-icons/asset-7.svg',
    title: 'Best Prices, No Middlemen',
    description:
      'Direct manufacturer pricing ensures you get premium quality electroplating equipment at the most competitive rates.',
  },
  {
    imageUrl: '/grid-icons/asset-8.svg',
    title: 'Quick Production & Shipping',
    description:
      'Efficient manufacturing processes and streamlined logistics ensure your equipment reaches you on time, every time.',
  },
  {
    imageUrl: '/grid-icons/asset-9.svg',
    title: 'Expert Technical Support',
    description:
      'Comprehensive installation guidance, process optimization, troubleshooting, and on-site assistance across India.',
  },
];

export default function Features() {
  return (
    <Container>
      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
          <BasicCard key={singleFeature.title} {...singleFeature} />
        ))}
      </CustomAutofitGrid>
    </Container>
  );
}

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
