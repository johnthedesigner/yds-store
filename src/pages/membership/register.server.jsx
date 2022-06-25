import _, {flatten} from 'lodash';
import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../../components/Layout.server';
import Hero from '../../components/Hero.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../../components/CompactText.server';
import MembershipForm from '../../components/MembershipForm.client';
import NewSeo from '../../components/NewSeo.client';
import pages from '../../pages.json';
import NotFound from '../../components/NotFound.client';

const Register = ({response}) => {
  response.cache({
    // Cache the page for one hour.
    // maxAge: 60 * 60,
    maxAge: 0,
    // Serve the stale page for up to 23 hours while getting a fresh response in the background.
    // staleWhileRevalidate: 23 * 60 * 60,
    staleWhileRevalidate: 0,
    // cache-control no-cache
    noStore: true,
  });

  // Current membership product handle
  const membershipHandle = 'yds-annual-membership-2022-2023';

  // Fetch products from shopify
  //   console.log(QUERY(membershipHandle));
  const {data} = useShopQuery({
    query: QUERY(membershipHandle),
    variables: {
      country: 'US',
    },
  });

  // If there are no products available, show "not found"
  if (data?.productByHandle == null) {
    return <NotFound />;
  }

  // If there are products, prepare product data
  const product = data ? data.productByHandle : [];
  const variants = product.variants ? flattenConnection(product.variants) : [];

  console.log(product);

  return (
    <Layout
      hero={<Hero title="Join Yankee Dahlia Society" image="/flowers.jpg" />}
      isCommercePage={false}
    >
      <NewSeo page={pages.join} />
      <CompactTextWrapper>
        <CompactText>
          <h3>WE WANT YOU for Yankee Dahlia Society!</h3>
          <p>
            Sign up now and receive an extended membership for your first year.
            Our membership year normally runs from August 1 through July 31.
            Join anytime between now and August 1, and your membership will
            remain valid through July 31, 2023. It’s a great time to join us as
            the season is heating up!
          </p>
        </CompactText>
        <CompactText>
          <MembershipForm />
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

const QUERY = (membershipHandle) => {
  return gql`
    query currentMembership {
      productByHandle(handle: "${membershipHandle}") {
            handle
            vendor
            title
            totalInventory
            tags
            hybridizer: metafield(namespace: "my_fields", key: "hybridizer") {
              key
              value
            }
            country_of_origin: metafield(
              namespace: "my_fields"
              key: "country_of_origin"
            ) {
              key
              value
            }
            introduction_year: metafield(
              namespace: "my_fields"
              key: "introduction_year"
            ) {
              key
              value
            }
            asd_code: metafield(namespace: "my_fields", key: "ads_code") {
              key
              value
            }
            bloom_size: metafield(namespace: "my_fields", key: "bloom_size") {
              key
              value
            }
            height: metafield(namespace: "my_fields", key: "height") {
              key
              value
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
          }
        }
  `;
};

export default Register;