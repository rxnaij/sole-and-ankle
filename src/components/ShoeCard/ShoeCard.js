import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  /* Two solutions are provided for the flags: one with how I'd do it originally,
  and the other (the un-commented one) using composition
  */
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {/* { 
            variant !== 'default' && 
            <Flag color={variant === 'new-release' ? COLORS.secondary : COLORS.primary}>
              { variant === 'new-release' ? 'Just released!' : 'Sale' }
            </Flag>
          } */}
          { variant === 'new-release' && <NewFlag>Just released!</NewFlag> }
          { variant === 'on-sale' && <SaleFlag>Sale</SaleFlag> }
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price 
            isOnSale={variant === 'on-sale'}
            style={{
              '--color': variant === 'on-sale' ? COLORS.gray['700'] : COLORS.gray['900']
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice> }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${props => props.isOnSale && 'line-through'};
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.span`
  position: absolute;
  background-color: ${props => props.color};
  color: white;
  font-weight: ${WEIGHTS.bold};

  top: 12px;
  right: -4px;

  padding: 8px 9px;
  border-radius: 2px;
`

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary}
`

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary}
`

export default ShoeCard;
