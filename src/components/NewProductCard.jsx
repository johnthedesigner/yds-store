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
import {
  WithAnyAccess,
  WithEarlyAccess,
  WithoutAccess,
} from './AccessControl.client';

const ProductCard = ({product, linkCard = true, showDetails = true}) => {
  let initialVariant = flattenConnection(product.variants)[0];

  const Price = ({price}) => {
    return `$${price}`;
  };

  const CountryFlag = ({product}) => {
    if (product.country_of_origin) {
      let countryString = product.country_of_origin.value.toLowerCase();
      return (
        <img
          className="product-grid__image-flag"
          src={`/flags/1x1/${countryString}.svg`}
          title={`Country of Origin: ${product.country_of_origin.value}`}
        />
      );
    } else {
      return null;
    }
  };

  const ImageOverlay = ({inventory, country}) => {
    // At which quantity should we stop highlighting inventory
    const inventoryCutoff = 5;
    if (inventory < inventoryCutoff || country) {
      return (
        <div className="product-grid__image-overlay">
          <p className="product-grid__inventory">
            {inventory < inventoryCutoff && (
              <small>
                <em>{inventory} left in stock.</em>
              </small>
            )}
          </p>
          <CountryFlag product={product} />
        </div>
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
          to={linkCard ? `/shop/products/${product.handle}` : null}
        >
          <Gallery />
        </Link>
        <ImageOverlay
          inventory={initialVariant.quantityAvailable}
          country={product.country_of_origin}
        />
      </div>
      {showDetails && (
        <div className="product-grid__product-info">
          <div>
            <div className="product-grid__title-row">
              <Link
                className="product-grid__title-link"
                to={linkCard ? `/shop/products/${product.handle}` : null}
              >
                <Product.Title as="h1" className="product-grid__title" />
              </Link>
              <WithAnyAccess>
                <Product.SelectedVariant.Price
                  className="product-grid__price"
                  as="p"
                >
                  <Price price={initialVariant.priceV2.amount} />
                </Product.SelectedVariant.Price>
              </WithAnyAccess>
              <WithoutAccess>
                <p>
                  <small>
                    <em>Log in for pricing</em>
                  </small>
                </p>
              </WithoutAccess>
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
      )}
    </Product>
  );
};

export default ProductCard;
