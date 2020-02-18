import React from 'react'
import { Card, CardContent, Typography, Box } from '@material-ui/core';

export default function AdminProfile(props) {
  const { adminId } = props;
  return (
    <Box mb={3}>
      <Card>
        <CardContent>
          <Box m={1} p={2}>
            <Typography
              gutterBottom
              variant="h5"
            >
              {adminId}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
