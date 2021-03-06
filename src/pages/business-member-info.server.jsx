import {Link} from '@shopify/hydrogen/client';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Pingpong from '../components/Pingpong.server';
import Bumper from '../components/Bumper.server';
import NewSeo from '../components/NewSeo.client';
import pages from '../pages.json';

const BusinessMemberInfo = ({response}) => {
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

  return (
    <Layout
      hero={
        <Hero
          title="Get the most out of your business membership."
          image="/flowers.jpg"
        />
      }
      isCommercePage={false}
    >
      <NewSeo page={pages.businessMembershipInfo} />
      <Pingpong
        side="right"
        image="/biz-member-listing.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>Send us your logo and a link to your website</h3>
        <p>
          We’re proud to list our business members{' '}
          <a href="https://www.yankeedahliasociety.com">on our website</a>, so
          send us your logo and website soon and we can start telling everyone
          about you. Email{' '}
          <a href="mailto:info@yankeedahliasociety.com">
            info@yankeedahliasociety.com
          </a>
          .
        </p>
      </Pingpong>
      <Pingpong
        side="left"
        image="/badges.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>
          Let people know you’re a proud Y.D.S. member, put our badge on your
          website.
        </h3>
        <p>
          Check out our logos & badges usage page to grab a badge image and
          check out how to show off your new Y.D.S. membership!
        </p>
        <Link to="/badge-info" className="button">
          Get a Y.D.S. Badge
        </Link>
      </Pingpong>
      <Pingpong
        side="right"
        image="/get-involved.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>Look for opportunites to get involved.</h3>
        <p>
          We’ve got all sorts of opportunities to get involved in upcoming
          events. Sponsor prizes in our holiday raffle, host a club meeting, be
          one of our feature speakers, and other great ways to engage with our
          members.
        </p>
        <Link to="/get-involved" className="button">
          Get Involved
        </Link>
      </Pingpong>
      <Pingpong
        side="left"
        image="/group-photo.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>Come to our next meeting!</h3>
        <p>
          Come join the fun and add your energy and expertise to our full
          calendar of fun virtual and in-person meetings.
        </p>
        <Link to="/meetings" className="button">
          Explore Meetings & Events
        </Link>
      </Pingpong>
      <Pingpong
        side="right"
        image="/growing-partners.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>Learn more about our Growing Partnerships.</h3>
        <p>
          Have land in need of tubers? Grow some for Y.D.S. and enjoy all the
          cut flowers you can grow. At the end of the season we sell the tubers
          to raise much-needed funds for Y.D.S.! Email{' '}
          <a href="mailto:info@yankeedahliasociety.com">
            info@yankeedahliasociety.com
          </a>{' '}
          to find out more.
        </p>
      </Pingpong>
      <Bumper
        text="Reach out to inquire about opportunities to get involved"
        buttonUrl="/contact"
        buttonLabel="Get in Touch"
      />
    </Layout>
  );
};

export default BusinessMemberInfo;
