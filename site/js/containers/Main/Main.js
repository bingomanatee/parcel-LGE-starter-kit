import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grommet, Grid, Box } from 'grommet';

import SiteHeader from '../SiteHeader';
import Content from '../../views/Content';

import MainGrid from './MainGrid';
import theme from '../../theme';

// pages

import Home from '../../pages/Home';
import DressStyles from '../../pages/admin/DressStyles';
import DressStylesEdit from '../../pages/admin/DressStylesEdit/DressStylesEdit';

export default class Main extends PureComponent {
  render() {
    return (
      <main>
        <Grommet theme={theme} full>
          <MainGrid>
            <Box gridArea="header">
              <SiteHeader />
            </Box>
            <Box gridArea="main">
              <Content>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/admin/dress-styles/:id" component={DressStylesEdit} />
                  <Route path="/admin/dress-styles" exact component={DressStyles} />
                  <Route component={Home} />
                </Switch>
              </Content>
            </Box>
          </MainGrid>
        </Grommet>
      </main>
    );
  }
}
