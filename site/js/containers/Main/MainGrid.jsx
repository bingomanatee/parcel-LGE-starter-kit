import React from 'react';
import { Grid, ResponsiveContext } from 'grommet';

export default ({ children }) => (
  <ResponsiveContext.Consumer>
    {(size) => {
      switch (size) {
        case 'small':
        case 'medium':
          return (
            <Grid
              rows={['60px', '1fr']}
              columns={['auto']}
              gap="none"
              pad="none"
              fill
              areas={[
                { name: 'header', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [0, 1], end: [0, 1] },
              ]}
              className="site-frame"
            >
              {children}
            </Grid>
          );
          break;

        default:
          return (
            <Grid
              rows={['80px', '1fr']}
              columns={['auto']}
              gap="none"
              pad="none"
              fill
              areas={[
                { name: 'header', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [0, 1], end: [0, 1] },
              ]}
              className="site-frame"
            >
              {children}
            </Grid>
          );
      }
    }}
  </ResponsiveContext.Consumer>
);
