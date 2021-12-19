import _ from 'lodash';
import {useServerState} from '@shopify/hydrogen/client';
import {useState} from 'react';

const FilterGroup = ({option, optionKey, selected}) => {
  const {setServerState} = useServerState();
  const [groupExpanded, setGroupExpanded] = useState(false);

  // Get keys for facets, and shorten the list unless expanded
  const facetKeys = _.keys(option);
  var displayedFacetKeys = [];
  if (Object.keys(facetKeys).length > 5 && !groupExpanded) {
    displayedFacetKeys = _.take(facetKeys, 5);
  } else {
    displayedFacetKeys = facetKeys;
  }

  // Get the right set of facets to display
  const displayedFacets = {};
  _.each(displayedFacetKeys, (key) => {
    displayedFacets[key] = option[key];
  });

  // Hide the show more button when it's not needed
  const expandStyles = {
    display: groupExpanded || option.length <= 5 ? 'none' : 'block',
  };

  return (
    <div className="product-filters__set">
      <h4 className="product-filters__group-name">{optionKey}</h4>
      {_.map(displayedFacets, (facet, facetKey) => {
        let tag = `${optionKey}-${facetKey}`;
        return (
          <div key={facetKey} className="product-filters__facet">
            <label className="product-filters__label" htmlFor={tag}>
              <input
                className="product-filters__checkbox"
                name={tag}
                type="checkbox"
                value={_.includes(selected, tag)}
                onClick={() => {
                  setServerState('selectedOptions', _.xor([tag], selected));
                }}
              />
              <span className="product-filters__facet-text">{facet}</span>
            </label>
          </div>
        );
      })}
      <p
        style={expandStyles}
        className="product-filters__expand"
        onClick={() => setGroupExpanded(true)}
      >
        Show more...
      </p>
    </div>
  );
};

const ProductFilters = ({options, selected}) => {
  return (
    <div className="product-filters">
      <h4>Filter Options</h4>
      {_.map(options, (option, optionKey) => {
        return (
          <FilterGroup
            key={optionKey}
            option={option}
            optionKey={optionKey}
            selected={selected}
          />
        );
      })}
    </div>
  );
};

export default ProductFilters;