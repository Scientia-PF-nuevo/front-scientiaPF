import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

export default function TextRating({score}) {

  const roundScore = Math.round(score)

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Rating
        name="text-feedback"
        value={roundScore}
        readOnly
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[roundScore]}</Box>
    </Box>
  );
}