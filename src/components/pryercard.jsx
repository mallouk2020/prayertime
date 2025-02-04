import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard( {salah ,time , img}) {
  return (
    <Card sx={{ maxWidth: 500, boxShadow:"2px -2px 7px black" }}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="120"
          image={img}
          alt="green iguana"
        />
        <CardContent className={"boxss"}>
          <h1  >
            {salah}
          </h1>

          <h1>
           {time}
          </h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}