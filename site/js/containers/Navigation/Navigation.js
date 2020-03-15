import React, { PureComponent } from 'react';
import {
  Button, ResponsiveContext, Box,
} from 'grommet';
import styled from 'styled-components';

export default class Navigation extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <Box pad="large" direction="row">
        <Button plain onClick={() => history.push('/')}>
          <Box pad="medium" style={{ textTransform: 'uppercase' }}>Home</Box>
        </Button>
        <Button plain onClick={() => history.push('/admin/dress-styles')}>
          <Box pad="medium" style={{ textTransform: 'uppercase' }}>Dress Styles</Box>
        </Button>
      </Box>
    );
  }
}
