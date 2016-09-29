import React from 'react';

const Category = (_, context) => <div>Category: { context.meta.category }</div>;

Category.contextTypes = {
  meta: React.PropTypes.object.isRequired,
};

export default Category;
