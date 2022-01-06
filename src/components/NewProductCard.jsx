// import locale from 'locale-codes';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  Product,
} from '@shopify/hydrogen';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import Gallery from './Gallery.client';
import TagDescriptor from './TagDescriptor';
import HybridizerDescriptor from './HybridizerDescriptor';

const ProductCard = ({product}) => {
  let initialVariant = flattenConnection(product.variants)[0];

  const Price = ({amount, currencyNarrowSymbol}) => {
    return `${currencyNarrowSymbol}${amount}`;
  };

  const CountryFlag = ({product}) => {
    if (product.country_of_origin) {
      //   let countryString = product.country_of_origin.value.toLowerCase();
      //   let countryCode = 'us';
      //    Find a way to import with iso country codes or convert
      //   let countryCode = locale.where('location', countryString);
      //   console.log(locale, countryCode);
      return (
        <img className="product-grid__image-flag" src={`/flags/1x1/us.svg`} />
      );
    } else {
      return null;
    }
  };

  return (
    <Product product={product} initialVariantId={initialVariant.id}>
      <div className="product-grid__image">
        <Link
          className="product-grid__image-link"
          to={`/shop/products/${product.handle}`}
        >
          <Gallery />
        </Link>
        <div className="product-grid__image-overlay">
          <p className="product-grid__inventory">
            {product.totalInventory < 5 && (
              <small>
                <em>{product.totalInventory} left in stock.</em>
              </small>
            )}
          </p>
          <CountryFlag product={product} />
        </div>
      </div>
      <div className="product-grid__product-info">
        <div>
          <div className="product-grid__title-row">
            <Link
              className="product-grid__title-link"
              to={`/shop/product/${product.handle}`}
            >
              <Product.Title as="h1" className="product-grid__title" />
            </Link>
            <Product.SelectedVariant.Price
              className="product-grid__price"
              as="p"
            >
              <Price />
            </Product.SelectedVariant.Price>
          </div>
          <HybridizerDescriptor
            hybridizer={product.hybridizer}
            introduction_year={product.introduction_year}
          />
          <TagDescriptor product={product} tag="form" label="Form" />
          <TagDescriptor product={product} tag="size" label="Size" />
          <TagDescriptor product={product} tag="color" label="Color" />
        </div>
      </div>
    </Product>
  );
};

export default ProductCard;
