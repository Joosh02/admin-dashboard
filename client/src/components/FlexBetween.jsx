const { styled } = require('@mui/system');
const { Box } = require('@mui/material');

const FlexBetween = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export default FlexBetween;
